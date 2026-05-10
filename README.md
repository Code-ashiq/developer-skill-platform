# Developer Skill Assessment Platform

A full-stack developer assessment platform built with Django REST Framework, React, and machine learning utilities. This repository includes an admin experience for managing questions, a code editor experience for solving problems, submission tracking, analytics, and sample ML-powered recommendation logic.

## Features

- User authentication and JWT token management
- Coding problem browsing and code execution flow
- Submission recording and analytics dashboards
- Admin question management UI
- Sample dataset seeding for programming challenges
- React frontend with Monaco code editor and protected routes

## Architecture

- `backend/` - Django REST API with apps for users, questions, submissions, analytics, and ML utilities
- `frontend/` - React single-page application with routing, editor, analytics, and admin pages
- `backend/env/` - Python virtual environment for backend dependencies

## Tech Stack

- Backend: Django 6, Django REST Framework, Simple JWT, dj-database-url, django-cors-headers
- Frontend: React 19, react-router-dom, axios, react-hot-toast, recharts, @monaco-editor/react
- Database: Configurable via `DATABASE_URL`, sample local seed data included

## Getting Started

### Backend Setup

1. Open a terminal and navigate to the backend folder:

   ```powershell
   cd C:\Users\ACER\Desktop\developer-skill-platform\backend
   ```

2. Activate the Python virtual environment:

   ```powershell
   .\env\Scripts\Activate.ps1
   ```

3. Install backend dependencies:

   ```powershell
   pip install -r requirements.txt
   ```

4. Create a `.env` file in `backend/` with the required environment variables:

   ```text
   SECRET_KEY=your-secret-key
   DEBUG=True
   DATABASE_URL=sqlite:///db.sqlite3
   ```

   > If you want to run PostgreSQL, set `DATABASE_URL` accordingly.

5. Run Django migrations:

   ```powershell
   python manage.py migrate
   ```

6. Seed sample questions:

   ```powershell
   python seed_data.py
   ```

7. Start the backend server:

   ```powershell
   python manage.py runserver
   ```

### Frontend Setup

1. Open a second terminal and navigate to the frontend folder:

   ```powershell
   cd C:\Users\ACER\Desktop\developer-skill-platform\frontend
   ```

2. Install frontend dependencies:

   ```powershell
   npm install
   ```

3. Create a `.env` file in `frontend/` with the backend API base URL:

   ```text
   REACT_APP_API_BASE_URL=http://localhost:8000
   ```

4. Start the React development server:

   ```powershell
   npm start
   ```

## Usage

- Visit `http://localhost:3000` to access the React app
- Log in or register a new account
- Browse problems, open a code editor, and submit solutions
- Access analytics and submissions from the dashboard
- Use `/admin/questions` if you are an admin to manage questions

## Seed Data

The repository includes a `backend/seed_data.py` script that creates sample algorithmic problems such as:

- Two Sum
- Reverse String
- Palindrome Check
- Factorial
- Fibonacci
- Valid Parentheses
- Merge Sorted Arrays
- Binary Search
- Longest Substring Without Repeating Characters
- Median of Two Sorted Arrays
- Maximum Subarray
- Climbing Stairs

## Project Structure

- `backend/config/` - Django settings and URL routing
- `backend/users/` - Authentication, user models, serializers, and views
- `backend/questions/` - Problem models, serializers, and endpoints
- `backend/submissions/` - Submission storage and evaluation utilities
- `backend/analytics/` - Analytics endpoints and reporting logic
- `backend/ml/` - Prediction and model training utilities
- `frontend/src/pages/` - React pages for login, dashboard, problems, editor, analytics, submissions, and admin
- `frontend/src/components/` - Shared layout and route components
- `frontend/src/services/api.js` - Axios API client with JWT interceptors

## Notes

- The backend uses JWT authentication and refresh token handling.
- The frontend expects `REACT_APP_API_BASE_URL` to be set for API requests.
- CORS is enabled in the backend to allow the React app to connect.

## License

This project is provided as-is for demonstration and development purposes.
