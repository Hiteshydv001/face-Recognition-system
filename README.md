# Face Recognition Authentication System 🚀

<p align="center">
  <img src="./frontend/public/assets/Project.gif" width="550" alt="Face Recognition Demo">
</p>

> A modern face recognition authentication system with a macOS-style interface, built with **FastAPI** backend and **ReactJS** frontend.

This project combines advanced face recognition technology with an elegant macOS-inspired user interface. It provides secure authentication through facial recognition while maintaining a beautiful and intuitive user experience.

## ✨ Features

- 🔐 **Face Recognition Authentication** - Secure login using facial recognition
- 🎨 **macOS Interface** - Beautiful macOS-inspired UI design
- ⚡ **Fast API Backend** - High-performance Python backend with FastAPI
- 🔄 **Real-time Processing** - Live face detection and recognition
- 📱 **Responsive Design** - Works across different screen sizes
- 🐳 **Docker Support** - Easy deployment with Docker
- 🗄️ **PostgreSQL Ready** - Production-ready database support

## 🛠️ Technology Stack

### Backend
- **API Framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **Database:** SQLite (development) / PostgreSQL (production)
- **ORM:** SQLAlchemy
- **Face Recognition:** InsightFace with ArcFace models
- **Server:** Gunicorn with Uvicorn workers
- **Containerization:** Docker

### Frontend  
- **Framework:** [React.js](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Styled Components
- **Deployment:** [Vercel](https://vercel.com/)

## 📁 Project Structure

```
face-recog/
├── face-recognition-auth-backend/    # FastAPI backend
│   ├── app/                         # Application code
│   │   ├── core/                   # Core configuration
│   │   ├── db/                     # Database models & CRUD
│   │   ├── api.py                  # API endpoints
│   │   ├── main.py                 # FastAPI app entry point
│   │   ├── services.py             # Business logic
│   │   └── schemas.py              # Pydantic models
│   ├── tests/                      # Backend tests
│   ├── requirements.txt            # Python dependencies
│   ├── Dockerfile                  # Backend container
│   └── database.db                 # SQLite database (dev)
├── frontend/                       # React frontend
│   ├── src/                       # Source code
│   ├── public/                    # Static assets
│   ├── package.json               # Node dependencies
│   └── vite.config.ts             # Vite configuration
└── README.md                      # Project documentation
```

## 🚀 Deployment Guide

### Prerequisites for Production Deployment

Your current setup uses SQLite, which is perfect for development but won't work on most hosting platforms due to ephemeral filesystems. We need to migrate to PostgreSQL for production.

### Step 1: Database Migration (SQLite → PostgreSQL)

The application is already configured to use environment variables for the database URL. In production, set the `DATABASE_URL` environment variable to your PostgreSQL connection string:

```
DATABASE_URL=postgresql://user:password@host:port/database
```

### Step 2: Deploy to Render.com (Recommended)

#### Create PostgreSQL Database

1. Sign up for a free account on [Render.com](https://render.com)
2. Connect your GitHub account
3. Click "New +" → "PostgreSQL"
4. Name your database (e.g., `face-recog-db`)
5. Select the **Free** plan
6. Click "Create Database"
7. Copy the **Internal Database URL** from the Info page

#### Deploy Backend Service

1. Click "New +" → "Web Service"
2. Select your GitHub repository
3. Configure the service:
   - **Name:** `face-recog-backend`
   - **Root Directory:** `face-recognition-auth-backend`
   - **Instance Type:** Free
4. Add Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL Internal Database URL
   - `PROVIDER`: `CPU` (or `CUDA` if using GPU instance)
5. Click "Create Web Service"

Render will automatically detect your Dockerfile and deploy the application. The first build may take several minutes as it downloads ML models.

#### Deploy Frontend

1. Update your frontend to use the deployed backend URL
2. Create `.env` file in the `frontend/` directory:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```
3. Deploy to Vercel, Netlify, or Render

### Alternative Deployment Options

#### Docker Compose (Self-hosted)

```yaml
# docker-compose.yml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: facerecog
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./face-recognition-auth-backend
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/facerecog
      PROVIDER: CPU
    depends_on:
      - db

volumes:
  postgres_data:
```

#### Heroku

1. Install Heroku CLI
2. Create new app: `heroku create your-app-name`
3. Add PostgreSQL addon: `heroku addons:create heroku-postgresql:hobby-dev`
4. Set environment variables:
   ```bash
   heroku config:set PROVIDER=CPU
   ```
5. Deploy: `git push heroku main`

## 💻 Local Development

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd face-recognition-auth-backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   python -m app.main
   ```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Docker Development

```bash
# Build and run backend
cd face-recognition-auth-backend
docker build -t face-recog-backend .
docker run -p 8000:8000 face-recog-backend
```

## 📚 API Documentation

Once the backend is running, you can access:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

## 🔧 Environment Variables

### Backend
- `DATABASE_URL`: Database connection string
- `PROVIDER`: ML model provider (`CPU` or `CUDA`)
- `SIMILARITY_THRESHOLD`: Face match threshold (default: 0.42)

### Frontend
- `VITE_API_BASE_URL`: Backend API URL

## 🧪 Testing

Run backend tests:
```bash
cd face-recognition-auth-backend
python -m pytest tests/
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Developer

| [<img src="https://github.com/Hiteshydv001.png" width=115><br><sub>@Hiteshydv001</sub>](https://github.com/Hiteshydv001) |
|:---:|

**Built with ❤️ by Hiteshydv001**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [InsightFace](https://github.com/deepinsight/insightface) for the face recognition models
- [FastAPI](https://fastapi.tiangolo.com/) for the amazing web framework
- [React](https://reactjs.org/) for the frontend framework

---

*This project was created for educational purposes and demonstrates the integration of face recognition technology with modern web development practices.*
