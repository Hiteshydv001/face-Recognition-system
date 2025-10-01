from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # The cosine similarity threshold for a successful match.
    # ArcFace models generally perform well with a threshold between 0.40 and 0.50.
    # A lower threshold is less strict, while a higher one is more strict.
    SIMILARITY_THRESHOLD: float = 0.42

    # Database URL for SQLite.
    # This will create a file named `database.db` in the root directory.
    DATABASE_URL: str = "sqlite:///./database.db"

    # Settings for the face recognition model provider.
    # 'CUDA' for GPU or 'CPU' for CPU.
    PROVIDER: str = "CPU"

    class Config:
        case_sensitive = True

settings = Settings()