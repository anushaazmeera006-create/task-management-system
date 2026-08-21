# Task Management System

A full-stack task management application with authentication, task CRUD operations, filtering, search, pagination, sorting, and analytics dashboard.

## Tech Stack

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router
- Axios
- Lucide React (icons)

## Features

### Authentication
- User signup with email validation
- User login with JWT tokens
- Protected routes
- Auto-authentication on page load

### Task Management
- Create, read, update, delete tasks
- Mark tasks as completed
- Task fields: Title, Description, Status, Priority, Due Date
- Status options: Todo, In Progress, Done
- Priority options: Low, Medium, High

### Filtering & Search
- Filter tasks by status
- Filter tasks by priority
- Search tasks by title

### Pagination & Sorting
- Pagination (10 tasks per page)
- Sort by: Created date, Due date, Priority
- Ascending/Descending order

### Analytics Dashboard
- Total tasks count
- Completed tasks count
- Pending tasks count
- Completion percentage
- Tasks by status breakdown
- Tasks by priority breakdown

### UI Features
- Clean, modern violet-themed UI
- Dark mode support
- Responsive design
- Loading states
- Error handling
- Real-time updates

## API Endpoints

### Authentication

#### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /api/auth/login
Login user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### GET /api/auth/me
Get current user (Protected).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Tasks

#### GET /api/tasks
Get all tasks for logged-in user (Protected).

**Query Parameters:**
- `status`: Filter by status (Todo, In Progress, Done)
- `priority`: Filter by priority (Low, Medium, High)
- `search`: Search by title
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (createdAt, dueDate, priority)
- `sortOrder`: Sort order (asc, desc)

**Example:**
```
GET /api/tasks?status=Todo&priority=High&page=1&limit=10&sortBy=createdAt&sortOrder=desc
```

**Response:**
```json
{
  "success": true,
  "tasks": [
    {
      "_id": "task_id",
      "title": "Task title",
      "description": "Task description",
      "status": "Todo",
      "priority": "High",
      "dueDate": "2024-01-01T00:00:00.000Z",
      "user": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalTasks": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### GET /api/tasks/:id
Get single task (Protected).

**Response:**
```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "Todo",
    "priority": "High",
    "dueDate": "2024-01-01T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /api/tasks
Create a new task (Protected).

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "status": "Todo",
  "priority": "Medium",
  "dueDate": "2024-01-01"
}
```

**Response:**
```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "Todo",
    "priority": "Medium",
    "dueDate": "2024-01-01T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/tasks/:id
Update a task (Protected).

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2024-01-02"
}
```

**Response:**
```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Updated title",
    "description": "Updated description",
    "status": "In Progress",
    "priority": "High",
    "dueDate": "2024-01-02T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PATCH /api/tasks/:id/complete
Mark task as completed (Protected).

**Response:**
```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "Done",
    "priority": "High",
    "dueDate": "2024-01-01T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### DELETE /api/tasks/:id
Delete a task (Protected).

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Analytics

#### GET /api/analytics
Get task analytics for logged-in user (Protected).

**Response:**
```json
{
  "success": true,
  "analytics": {
    "totalTasks": 50,
    "completedTasks": 30,
    "pendingTasks": 20,
    "completionPercentage": 60,
    "tasksByStatus": {
      "Todo": 10,
      "In Progress": 10,
      "Done": 30
    },
    "tasksByPriority": {
      "High": 15,
      "Medium": 20,
      "Low": 15
    }
  }
}
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Running the Application

1. Make sure MongoDB is running
2. Start the backend server (in one terminal):
```bash
cd backend
npm run dev
```

3. Start the frontend server (in another terminal):
```bash
cd frontend
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Design Decisions

### Backend
- **JWT Authentication**: Chosen for stateless authentication and easy integration with frontend
- **Mongoose Indexing**: Added indexes on user, status, and priority fields for optimized query performance
- **Express Validator**: Used for input validation to ensure data integrity
- **Global Error Handler**: Centralized error handling for consistent error responses
- **Password Hashing**: bcryptjs with salt rounds of 10 for secure password storage

### Frontend
- **Vite**: Chosen over Create React App for faster development and build times
- **TailwindCSS**: Utility-first CSS framework for rapid UI development with consistent violet theme
- **Context API**: Used for authentication and theme state management to avoid prop drilling
- **React Router**: For client-side routing and protected routes
- **Lucide React**: Modern icon library for consistent and beautiful icons
- **Axios**: For HTTP requests with built-in interceptors for JWT token handling

### Database Schema
- **User Model**: Stores name, email, and hashed password with email uniqueness constraint
- **Task Model**: Stores task details with user reference, status, priority, and timestamps
- **Indexes**: Optimized for common query patterns (user + status + priority, user + title search)

### UI/UX
- **Violet Theme**: Consistent violet color palette throughout the application
- **Dark Mode**: Toggleable dark mode with localStorage persistence
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages and validation feedback
- **Analytics Dashboard**: Real-time statistics with visual cards

## Project Structure

```
TaskManager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   └── analytics.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Future Enhancements

- Task categories/tags
- Task reminders/notifications
- Task comments/collaboration
- File attachments for tasks
- Export tasks to CSV/PDF
- Calendar view
- Kanban board view
- Task templates
- Subtasks
- Time tracking
- Advanced analytics with charts
- Email notifications
- OAuth authentication (Google, GitHub)
