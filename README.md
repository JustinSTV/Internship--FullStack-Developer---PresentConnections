# Quiz Application
Internship FullStack Developer - PresentConnections

A full-stack web application that allows users to take quizzes and view high scores. Built with ASP.NET Core and React.

## Features

- 10 quiz questions with different types (Radio, Checkbox, Text)
- Real-time score calculation
- High scores leaderboard with top 10 entries

## Tech Stack

### Backend
- ASP.NET Core 9.0
- Entity Framework Core with In-Memory Database
- AutoMapper
- Dependency Injection
- RESTful API

### Frontend
- React with TypeScript
- Material UI Components
- React Router
- Axios for API calls

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/QuizApp.git
cd QuizApp
```

2. Start the backend:
```bash
cd QuizApp.API
dotnet restore
dotnet run
```

The API will be available at http://localhost:5098

3. Start the frontend:
```bash
cd QuizApp.Client
npm install
npm run dev
```

The application will be available at http://localhost:5173

## API Endpoints
- `GET /api/questions` - Get all quiz questions
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/highscores` - Get top 10 high scores