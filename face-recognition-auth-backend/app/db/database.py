from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Create the SQLAlchemy engine.
# connect_args is needed only for SQLite to allow multi-threaded access.
engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create a SessionLocal class. Each instance of this class will be a database session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for our database models (declarative mapping).
Base = declarative_base()

# Dependency to get a DB session in API endpoints.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()