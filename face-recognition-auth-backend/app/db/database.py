from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Determine whether we're using SQLite. SQLite requires a special
# connect_args parameter to allow multi-threaded access in some setups.
is_sqlite = isinstance(settings.DATABASE_URL, str) and settings.DATABASE_URL.startswith("sqlite")

# Create the SQLAlchemy engine. Only pass connect_args for SQLite.
if is_sqlite:
    engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(settings.DATABASE_URL)

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