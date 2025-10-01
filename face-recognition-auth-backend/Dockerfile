# Stage 1: Build stage with dependencies
FROM python:3.9-slim as builder

WORKDIR /app

# Install system dependencies required for opencv and other libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    libjpeg-dev \
    libpng-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Stage 2: Final production stage
FROM python:3.9-slim

WORKDIR /app

# Copy installed packages from the builder stage
COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy the application code
COPY ./app /app/app

# The insightface model will be downloaded to ~/.insightface/models/
# We create a non-root user for security
RUN useradd --create-home appuser
USER appuser
ENV HOME=/home/appuser

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application with Gunicorn
# -w 4 means 4 worker processes (a good starting point)
# -k uvicorn.workers.UvicornWorker tells Gunicorn how to run the FastAPI app
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]