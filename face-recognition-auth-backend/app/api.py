from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from . import schemas, services
from .db.database import get_db
from .db import crud

router = APIRouter()

def get_client_info(request: Request):
    """Extract client IP and User-Agent from request."""
    # Try to get real IP from headers (for reverse proxy setups)
    ip_address = request.headers.get("X-Forwarded-For", request.headers.get("X-Real-IP", request.client.host))
    user_agent = request.headers.get("User-Agent")
    return ip_address, user_agent

@router.post("/enroll", response_model=schemas.SuccessResponse)
def enroll(request: schemas.EnrollRequest, req: Request, db: Session = Depends(get_db)):
    """
    Enroll a new user with multiple face images.
    Calculates a centroid embedding and stores it.
    """
    try:
        ip_address, user_agent = get_client_info(req)
        services.enroll_user(db, request.user_id, request.images, ip_address, user_agent)
        return {"ok": True, "user_id": request.user_id}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@router.post("/verify", response_model=schemas.VerifyResponse)
def verify(request: schemas.VerifyRequest, req: Request, db: Session = Depends(get_db)):
    """
    Verify a user's face against their stored embedding.
    """
    try:
        ip_address, user_agent = get_client_info(req)
        is_match, similarity = services.verify_user(db, request.user_id, request.image, ip_address, user_agent)
        return {
            "ok": True,
            "match": is_match,
            "similarity": round(similarity, 4)
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )

# Analytics and Management Endpoints

@router.get("/users", response_model=List[schemas.UserInfo])
def get_all_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all registered users."""
    users = crud.get_all_users(db, skip=skip, limit=limit)
    return users

@router.get("/users/{user_id}", response_model=schemas.UserInfo)
def get_user_info(user_id: str, db: Session = Depends(get_db)):
    """Get information about a specific user."""
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/users/{user_id}/images", response_model=List[schemas.UserImageInfo])
def get_user_images(user_id: str, image_type: Optional[str] = None, db: Session = Depends(get_db)):
    """Get all images for a specific user."""
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    images = crud.get_user_images(db, user_id, image_type)
    return images

@router.get("/users/{user_id}/images/{image_id}/data", response_model=schemas.ImageDataResponse)
def get_user_image_data(user_id: str, image_id: int, db: Session = Depends(get_db)):
    """Get the actual image data for viewing."""
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    image = db.query(crud.models.UserImage).filter(
        crud.models.UserImage.id == image_id,
        crud.models.UserImage.user_id == user_id
    ).first()
    
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    return {
        "id": image.id,
        "user_id": image.user_id,
        "image_data": image.image_data,
        "image_type": image.image_type,
        "created_at": image.created_at
    }

@router.get("/users/{user_id}/stats", response_model=schemas.UserStats)
def get_user_statistics(user_id: str, db: Session = Depends(get_db)):
    """Get statistics for a specific user."""
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.get_user_stats(db, user_id)

@router.get("/access-logs", response_model=List[schemas.AccessLogInfo])
def get_access_logs(user_id: Optional[str] = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get access logs with optional user filtering."""
    logs = crud.get_access_logs(db, user_id, skip, limit)
    return logs

@router.get("/access-logs/recent")
def get_recent_access_logs(hours: int = 24, db: Session = Depends(get_db)):
    """Get access logs from the last N hours."""
    logs = crud.get_recent_access_logs(db, hours)
    return logs

@router.get("/unknown-access", response_model=List[schemas.UnknownAccessInfo])
def get_unknown_access_attempts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get unknown access attempts."""
    attempts = crud.get_unknown_access_logs(db, skip, limit)
    return attempts

@router.get("/unknown-access/{attempt_id}/image")
def get_unknown_access_image(attempt_id: int, db: Session = Depends(get_db)):
    """Get the image from an unknown access attempt."""
    attempt = db.query(crud.models.UnknownAccess).filter(
        crud.models.UnknownAccess.id == attempt_id
    ).first()
    
    if not attempt:
        raise HTTPException(status_code=404, detail="Unknown access attempt not found")
    
    return {
        "id": attempt.id,
        "image_data": attempt.image_data,
        "attempted_user_id": attempt.attempted_user_id,
        "created_at": attempt.created_at
    }

@router.get("/stats/system", response_model=schemas.SystemStats)
def get_system_statistics(db: Session = Depends(get_db)):
    """Get overall system statistics."""
    return crud.get_system_stats(db)

@router.delete("/users/{user_id}")
def delete_user(user_id: str, db: Session = Depends(get_db)):
    """Deactivate a user (soft delete)."""
    user = crud.deactivate_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": f"User {user_id} has been deactivated"}