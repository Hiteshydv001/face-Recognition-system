from fastapi import FastAPI
# ADD THIS IMPORT
from fastapi.middleware.cors import CORSMiddleware 
from .db import models
from .db.database import engine
from .api import router as api_router

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

# Define the list of allowed origins.
# For development, you can allow all origins with ["*"].
# For production, you should be specific.
origins = [
    "https://preview--face-flux-scan.lovable.app", # The origin of your deployed frontend
    "http://localhost",
    "http://localhost:3000", # Example for a local React dev server
    "http://127.0.0.1:5500"  # Example for VS Code Live Server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specific origins
    allow_credentials=True, # Allows cookies (not used in this MVP, but good practice)
    allow_methods=["*"],    # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)
# --- END OF CORS CONFIGURATION ---


# Include the API router with a prefix
app.include_router(api_router, prefix="/api")

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the Face Recognition API"}