## Root Dockerfile
# This Dockerfile builds the production image for the FastAPI backend located in
# the `face-recognition-auth-backend` subfolder. It delegates installing Python
# dependencies and building the final image by using a multistage build similar
# to the backend/Dockerfile, but kept here so you can build from repo root.

FROM python:3.9-slim as builder
WORKDIR /app

# Install system deps required by some python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    libjpeg-dev \
    libpng-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements to leverage Docker cache
COPY face-recognition-auth-backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r /app/requirements.txt

# Final image
FROM python:3.9-slim
WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application code
COPY face-recognition-auth-backend/app /app/app

# Create a non-root user
RUN useradd --create-home appuser && chown -R appuser:appuser /app
USER appuser
ENV HOME=/home/appuser

# Expose port
EXPOSE 8000

# Entrypoint: run gunicorn with uvicorn workers
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "--bind", "0.0.0.0:8000"]
