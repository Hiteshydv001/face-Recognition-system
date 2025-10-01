import base64
import cv2
import insightface
import numpy as np
from sqlalchemy.orm import Session
from typing import List, Optional, Tuple

# MODIFIED IMPORT: We now import 'crud' directly.
from .db import crud
from .core.config import settings

# Initialize the FaceAnalysis model from insightface
# This is a heavy object, so we initialize it once and reuse it.
face_analyzer = insightface.app.FaceAnalysis(
    providers=[settings.PROVIDER + 'ExecutionProvider']
)
face_analyzer.prepare(ctx_id=0, det_size=(640, 640))

def decode_image(base64_string: str) -> np.ndarray:
    """Decode a base64 string to a NumPy array (image)."""
    # The string might be a data URL, so we strip the header.
    if "," in base64_string:
        base64_string = base64_string.split(',')[1]
    
    img_bytes = base64.b64decode(base64_string)
    img_np = np.frombuffer(img_bytes, dtype=np.uint8)
    img = cv2.imdecode(img_np, cv2.IMREAD_COLOR)
    return img

def get_embedding(image: np.ndarray) -> Optional[np.ndarray]:
    """Get the face embedding from a single image."""
    faces = face_analyzer.get(image)
    if faces and len(faces) == 1:
        # Return the normalized embedding for the detected face
        return faces[0].normed_embedding
    return None

def calculate_centroid_embedding(embeddings: List[np.ndarray]) -> np.ndarray:
    """Calculate the average (centroid) of multiple embeddings."""
    centroid = np.mean(embeddings, axis=0)
    # Normalize the centroid vector to unit length
    norm = np.linalg.norm(centroid)
    return centroid / norm if norm > 0 else centroid

def cosine_similarity(embedding1: np.ndarray, embedding2: np.ndarray) -> float:
    """Calculate the cosine similarity between two embeddings."""
    # Ensure embeddings are numpy arrays for dot product
    embedding1 = np.array(embedding1)
    embedding2 = np.array(embedding2)
    return np.dot(embedding1, embedding2) / (np.linalg.norm(embedding1) * np.linalg.norm(embedding2))

def enroll_user(database: Session, user_id: str, images: List[str], ip_address: Optional[str] = None, user_agent: Optional[str] = None) -> bool:
    """Enroll a user by processing multiple images and storing the centroid embedding."""
    if crud.get_user(database, user_id):
        raise ValueError("User ID already exists.")

    embeddings = []
    valid_images = []
    
    # Process each image and extract embeddings
    for img_b64 in images:
        img = decode_image(img_b64)
        if img is None:
            continue # Skip if image decoding failed
        embedding = get_embedding(img)
        if embedding is not None:
            embeddings.append(embedding)
            valid_images.append(img_b64)
            # Store individual enrollment images
            crud.store_user_image(database, user_id, img_b64, embedding, "enrollment")

    if not embeddings:
        # Log failed enrollment attempt
        crud.log_access_attempt(
            database, user_id, "enrollment", False, 
            image_data=images[0] if images else None,
            ip_address=ip_address, user_agent=user_agent
        )
        raise ValueError("No valid faces found in the provided images.")

    centroid_embedding = calculate_centroid_embedding(embeddings)
    
    # Create user with centroid embedding
    crud.create_user(database, user_id, centroid_embedding)
    
    # Log successful enrollment
    crud.log_access_attempt(
        database, user_id, "enrollment", True,
        ip_address=ip_address, user_agent=user_agent
    )
    
    return True

def verify_user(database: Session, user_id: str, image: str, ip_address: Optional[str] = None, user_agent: Optional[str] = None) -> Tuple[bool, float]:
    """Verify a user's face against their stored embedding."""
    user = crud.get_user(database, user_id)
    
    live_img = decode_image(image)
    if live_img is None:
        # Log failed attempt due to image decoding error
        if user:
            crud.log_access_attempt(
                database, user_id, "verification_failed", False,
                image_data=image, ip_address=ip_address, user_agent=user_agent
            )
        else:
            crud.log_unknown_access(
                database, image, attempted_user_id=user_id,
                ip_address=ip_address, user_agent=user_agent
            )
        raise ValueError("Could not decode the provided live image.")
        
    live_embedding = get_embedding(live_img)

    if live_embedding is None:
        # Log failed attempt due to no face detected
        if user:
            crud.log_access_attempt(
                database, user_id, "verification_failed", False,
                image_data=image, ip_address=ip_address, user_agent=user_agent
            )
        else:
            crud.log_unknown_access(
                database, image, attempted_user_id=user_id,
                ip_address=ip_address, user_agent=user_agent
            )
        raise ValueError("No face detected in the live image.")

    if not user:
        # Log unknown access attempt
        crud.log_unknown_access(
            database, image, live_embedding, user_id,
            ip_address=ip_address, user_agent=user_agent
        )
        raise ValueError("User ID not found.")

    stored_embedding = user.embedding
    similarity = cosine_similarity(live_embedding, stored_embedding)
    is_match = similarity >= settings.SIMILARITY_THRESHOLD

    # Store verification image and log access attempt
    crud.store_user_image(database, user_id, image, live_embedding, "verification")
    
    access_type = "verification_success" if is_match else "verification_failed"
    crud.log_access_attempt(
        database, user_id, access_type, is_match,
        image_data=image, embedding=live_embedding, similarity_score=float(similarity),
        ip_address=ip_address, user_agent=user_agent
    )

    return is_match, float(similarity)