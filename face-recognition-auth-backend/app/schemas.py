from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Schema for the enrollment request body
class EnrollRequest(BaseModel):
    user_id: str
    images: List[str]  # List of base64-encoded image data URLs

# Schema for the verification request body
class VerifyRequest(BaseModel):
    user_id: str
    image: str  # A single base64-encoded image data URL

# Standard success response
class SuccessResponse(BaseModel):
    ok: bool
    user_id: str

# Schema for the verification response
class VerifyResponse(BaseModel):
    ok: bool
    match: bool
    similarity: Optional[float] = None

# User information schema
class UserInfo(BaseModel):
    id: str
    created_at: datetime
    updated_at: datetime
    is_active: bool

    class Config:
        from_attributes = True

# User image schema
class UserImageInfo(BaseModel):
    id: int
    user_id: str
    image_type: str
    created_at: datetime

    class Config:
        from_attributes = True

# Access log schema
class AccessLogInfo(BaseModel):
    id: int
    user_id: str
    access_type: str
    success: bool
    similarity_score: Optional[float] = None
    ip_address: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Unknown access schema
class UnknownAccessInfo(BaseModel):
    id: int
    attempted_user_id: Optional[str] = None
    ip_address: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Statistics schemas
class UserStats(BaseModel):
    user_id: str
    total_attempts: int
    successful_attempts: int
    failed_attempts: int
    success_rate: float

class SystemStats(BaseModel):
    total_users: int
    total_access_attempts: int
    successful_attempts: int
    failed_attempts: int
    unknown_attempts: int
    success_rate: float

# Image data response (for viewing stored images)
class ImageDataResponse(BaseModel):
    id: int
    user_id: str
    image_data: str  # Base64 encoded
    image_type: str
    created_at: datetime