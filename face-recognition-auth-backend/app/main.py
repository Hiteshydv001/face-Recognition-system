from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import models
from .db.database import engine
from .api import router as api_router
from .core.config import settings

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Face Recognition Authentication API",
    description="A passwordless authentication system using FastAPI and ArcFace.",
    version="1.0.0"
)

# --- ADD THE CORS MIDDLEWARE ---
# This is the "guest list" for your nightclub.
# It tells the browser which origins are allowed to make requests.

# Read allowed origins from settings. Supports:
# - '*' to allow all origins
# - comma-separated origins (no spaces required)
allowed = settings.ALLOWED_ORIGINS or "*"
if allowed.strip() == "*":
    allow_origins = ["*"]
else:
    # Split by comma and strip whitespace
    allow_origins = [o.strip() for o in allowed.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --- END OF CORS CONFIGURATION ---


# Include the API router with a prefix
app.include_router(api_router, prefix="/api")

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the Face Recognition API"}