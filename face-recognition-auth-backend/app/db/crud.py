from sqlalchemy.orm import Session
from sqlalchemy import desc
import numpy as np
from datetime import datetime, timedelta
from typing import List, Optional
from . import models

# User Management
def get_user(db: Session, user_id: str):
    """Retrieve a user by their unique ID."""
    return db.query(models.User).filter(models.User.id == user_id, models.User.is_active == True).first()

def create_user(db: Session, user_id: str, embedding: np.ndarray):
    """Create a new user entry in the database."""
    db_user = models.User(id=user_id, embedding=embedding)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_users(db: Session, skip: int = 0, limit: int = 100):
    """Get all active users with pagination."""
    return db.query(models.User).filter(models.User.is_active == True).offset(skip).limit(limit).all()

def deactivate_user(db: Session, user_id: str):
    """Deactivate a user (soft delete)."""
    user = get_user(db, user_id)
    if user:
        user.is_active = False
        user.updated_at = datetime.utcnow()
        db.commit()
        return user
    return None

# Image Management
def store_user_image(db: Session, user_id: str, image_data: str, embedding: np.ndarray, image_type: str):
    """Store a user's image with its embedding."""
    db_image = models.UserImage(
        user_id=user_id,
        image_data=image_data,
        embedding=embedding,
        image_type=image_type
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image

def get_user_images(db: Session, user_id: str, image_type: Optional[str] = None):
    """Get all images for a specific user."""
    query = db.query(models.UserImage).filter(models.UserImage.user_id == user_id)
    if image_type:
        query = query.filter(models.UserImage.image_type == image_type)
    return query.order_by(desc(models.UserImage.created_at)).all()

# Access Logging
def log_access_attempt(db: Session, user_id: str, access_type: str, success: bool, 
                      image_data: Optional[str] = None, embedding: Optional[np.ndarray] = None,
                      similarity_score: Optional[float] = None, ip_address: Optional[str] = None,
                      user_agent: Optional[str] = None):
    """Log an access attempt."""
    db_log = models.AccessLog(
        user_id=user_id,
        access_type=access_type,
        success=success,
        image_data=image_data,
        embedding=embedding,
        similarity_score=similarity_score,
        ip_address=ip_address,
        user_agent=user_agent
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

def get_access_logs(db: Session, user_id: Optional[str] = None, skip: int = 0, limit: int = 100):
    """Get access logs with optional user filtering."""
    query = db.query(models.AccessLog)
    if user_id:
        query = query.filter(models.AccessLog.user_id == user_id)
    return query.order_by(desc(models.AccessLog.created_at)).offset(skip).limit(limit).all()

def get_recent_access_logs(db: Session, hours: int = 24):
    """Get access logs from the last N hours."""
    since = datetime.utcnow() - timedelta(hours=hours)
    return db.query(models.AccessLog).filter(
        models.AccessLog.created_at >= since
    ).order_by(desc(models.AccessLog.created_at)).all()

# Unknown Access Tracking
def log_unknown_access(db: Session, image_data: str, embedding: Optional[np.ndarray] = None,
                      attempted_user_id: Optional[str] = None, ip_address: Optional[str] = None,
                      user_agent: Optional[str] = None):
    """Log an access attempt by unknown user."""
    db_unknown = models.UnknownAccess(
        image_data=image_data,
        embedding=embedding,
        attempted_user_id=attempted_user_id,
        ip_address=ip_address,
        user_agent=user_agent
    )
    db.add(db_unknown)
    db.commit()
    db.refresh(db_unknown)
    return db_unknown

def get_unknown_access_logs(db: Session, skip: int = 0, limit: int = 100):
    """Get unknown access attempts."""
    return db.query(models.UnknownAccess).order_by(desc(models.UnknownAccess.created_at)).offset(skip).limit(limit).all()

# Analytics Functions
def get_user_stats(db: Session, user_id: str):
    """Get statistics for a specific user."""
    total_attempts = db.query(models.AccessLog).filter(models.AccessLog.user_id == user_id).count()
    successful_attempts = db.query(models.AccessLog).filter(
        models.AccessLog.user_id == user_id, 
        models.AccessLog.success == True
    ).count()
    failed_attempts = total_attempts - successful_attempts
    
    return {
        "user_id": user_id,
        "total_attempts": total_attempts,
        "successful_attempts": successful_attempts,
        "failed_attempts": failed_attempts,
        "success_rate": (successful_attempts / total_attempts * 100) if total_attempts > 0 else 0
    }

def get_system_stats(db: Session):
    """Get overall system statistics."""
    total_users = db.query(models.User).filter(models.User.is_active == True).count()
    total_access_attempts = db.query(models.AccessLog).count()
    successful_attempts = db.query(models.AccessLog).filter(models.AccessLog.success == True).count()
    unknown_attempts = db.query(models.UnknownAccess).count()
    
    return {
        "total_users": total_users,
        "total_access_attempts": total_access_attempts,
        "successful_attempts": successful_attempts,
        "failed_attempts": total_access_attempts - successful_attempts,
        "unknown_attempts": unknown_attempts,
        "success_rate": (successful_attempts / total_access_attempts * 100) if total_access_attempts > 0 else 0
    }