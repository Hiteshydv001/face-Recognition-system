import json
import numpy as np
from datetime import datetime
from sqlalchemy import Column, String, Text, TypeDecorator, DateTime, Boolean, Float, Integer
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class NumpyArrayEncoder(TypeDecorator):
    """Custom type to store numpy arrays as JSON in the database."""
    impl = Text

    def process_bind_param(self, value, dialect):
        if value is not None:
            return json.dumps(value.tolist())
        return None

    def process_result_value(self, value, dialect):
        if value is not None:
            return np.array(json.loads(value))
        return None

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    embedding = Column(NumpyArrayEncoder, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

class UserImage(Base):
    __tablename__ = "user_images"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, nullable=False, index=True)
    image_data = Column(Text, nullable=False)  # Base64 encoded image
    embedding = Column(NumpyArrayEncoder, nullable=True)  # Individual image embedding
    image_type = Column(String, nullable=False)  # 'enrollment' or 'verification'
    created_at = Column(DateTime, default=datetime.utcnow)

class AccessLog(Base):
    __tablename__ = "access_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, nullable=False, index=True)
    access_type = Column(String, nullable=False)  # 'enrollment', 'verification_success', 'verification_failed'
    image_data = Column(Text, nullable=True)  # Base64 encoded image
    embedding = Column(NumpyArrayEncoder, nullable=True)  # Face embedding from attempt
    similarity_score = Column(Float, nullable=True)  # Similarity score for verification attempts
    success = Column(Boolean, nullable=False)
    ip_address = Column(String, nullable=True)
    user_agent = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class UnknownAccess(Base):
    __tablename__ = "unknown_access"

    id = Column(Integer, primary_key=True, autoincrement=True)
    image_data = Column(Text, nullable=False)  # Base64 encoded image
    embedding = Column(NumpyArrayEncoder, nullable=True)  # Face embedding
    attempted_user_id = Column(String, nullable=True)  # User ID they tried to use
    ip_address = Column(String, nullable=True)
    user_agent = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)