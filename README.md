<p align="center">
  <a href="#" target="_blank">
    <img src="./frontend/public/assets/Project.gif" width="550">
  </a>
</p>

# Face Recognition Authentication System

> A modern face recognition authentication system with a macOS-style interface, built with **FastAPI** backend and **ReactJS** frontend.

This project combines advanced face recognition technology with an elegant macOS-inspired user interface. It provides secure authentication through facial recognition while maintaining a beautiful and intuitive user experience. <br />
Feel free to contribute and share your feedback!

## Features

- 🔐 **Face Recognition Authentication** - Secure login using facial recognition
- 🎨 **macOS Interface** - Beautiful macOS-inspired UI design
- ⚡ **Fast API Backend** - High-performance Python backend with FastAPI
- 🔄 **Real-time Processing** - Live face detection and recognition
- 📱 **Responsive Design** - Works across different screen sizes
- 🐳 **Docker Support** - Easy deployment with Docker

## Technology Stack

### Backend
- **API Framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **Database:** SQLite with SQLAlchemy ORM
- **Face Recognition:** Python face recognition libraries
- **Containerization:** [Docker](https://docker.com/)

### Frontend  
- **Framework:** [React.js](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Styled Components
- **Deployment:** [Vercel](https://vercel.com/)

## Project Structure

```
face-recog/
├── face-recognition-auth-backend/    # FastAPI backend
│   ├── app/                         # Application code
│   ├── tests/                       # Backend tests
│   ├── requirements.txt             # Python dependencies
│   ├── Dockerfile                   # Backend container
│   └── database.db                  # SQLite database
├── frontend/                        # React frontend
│   ├── src/                        # Source code
│   ├── public/                     # Static assets
│   ├── package.json                # Node dependencies
│   └── vite.config.ts              # Vite configuration
└── README.md                       # Project documentation
```

## Running Locally

### Prerequisites
- Python 3.8+
- Node.js 16+
- Docker (optional)

### Backend Setup

1. Navigate to the backend directory:
```sh
cd face-recognition-auth-backend
```

2. Create a virtual environment:
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```sh
pip install -r requirements.txt
```

4. Run the FastAPI server:
```sh
python -m app.main
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```sh
cd frontend
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Docker Setup (Alternative)

1. Clone this repository:
```sh
git clone <your-repo-url>
cd face-recog
```

2. Run with Docker Compose (if available):
```sh
docker-compose up -d
```

Or build and run the backend container:
```sh
cd face-recognition-auth-backend
docker build -t face-recog-backend .
docker run -p 8000:8000 face-recog-backend
```

## API Documentation

Once the backend is running, you can access:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Developer

| [<img src="https://github.com/Asus.png" width=115><br><sub>@Asus</sub>](https://github.com/Asus) |
|:---:|

**Built with ❤️ by Asus**

---

*This project was created for educational purposes and demonstrates the integration of face recognition technology with modern web development practices.*
