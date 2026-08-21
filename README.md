# 🚀 Task Management System

> **A powerful full-stack task management application built with passion and dedication by a student developer**

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![React](https://img.shields.io/badge/React-18.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 About This Project

This Task Management System represents my journey as a full-stack developer, showcasing my ability to build complete, production-ready applications from scratch. It's not just another todo app – it's a comprehensive solution designed to help users organize their tasks efficiently with a beautiful, intuitive interface.

### 💡 Why I Built This

As a student passionate about web development, I wanted to challenge myself to build something that combines:
- **Modern technologies** (MERN stack)
- **Real-world features** (authentication, CRUD, analytics)
- **Beautiful UI/UX** (violet theme, dark mode, responsive design)
- **Best practices** (security, error handling, code organization)

---

## 🎯 Key Features

### 🔐 Secure Authentication
- **JWT-based authentication** for secure user sessions
- **Password hashing** with bcryptjs for data protection
- **Protected routes** to ensure only authorized users can access their tasks
- **Auto-authentication** on page reload for seamless experience

### 📋 Advanced Task Management
- **Full CRUD operations** – Create, Read, Update, Delete tasks
- **Smart task organization** with status tracking (Todo, In Progress, Done)
- **Priority levels** (Low, Medium, High) to focus on what matters most
- **Due dates** to never miss important deadlines
- **One-click completion** to mark tasks as done instantly

### 🔍 Powerful Search & Filtering
- **Real-time search** by task title
- **Filter by status** to see specific task categories
- **Filter by priority** to focus on high-priority items
- **Combine filters** for precise task discovery

### 📊 Analytics Dashboard
- **Visual statistics cards** showing task overview
- **Completion percentage** to track productivity
- **Status breakdown** to understand task distribution
- **Priority analysis** to optimize workflow

### 🎨 Beautiful User Interface
- **Modern violet theme** for a professional look
- **Dark mode support** for comfortable viewing in any lighting
- **Fully responsive design** – works on desktop, tablet, and mobile
- **Large, readable fonts** for excellent accessibility
- **Wide dashboard layout** (95% screen width) for maximum productivity
- **Smooth animations** and transitions for delightful interactions

---

## 🛠️ Tech Stack

### Backend
- **Node.js** – JavaScript runtime for server-side code
- **Express.js** – Fast, minimalist web framework
- **MongoDB** – NoSQL database for flexible data storage
- **Mongoose** – Elegant MongoDB object modeling
- **JWT** – JSON Web Tokens for secure authentication
- **bcryptjs** – Password hashing library
- **dotenv** – Environment variable management

### Frontend
- **React 18** – Modern UI library with hooks
- **Vite** – Lightning-fast build tool and dev server
- **TailwindCSS** – Utility-first CSS framework
- **React Router** – Client-side routing
- **Axios** – HTTP client for API requests
- **Lucide React** – Beautiful icon library
- **Context API** – State management without prop drilling

---

## 📸 Screenshots

### Dashboard (Light Mode)
A clean, spacious dashboard with analytics cards and task table occupying 95% of screen width.

### Dashboard (Dark Mode)
The same beautiful interface in dark mode for comfortable viewing.

### Authentication Flow
Smooth login and signup experience with form validation.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) – [Download here](https://nodejs.org/)
- **MongoDB** (local or MongoDB Atlas) – [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** – Comes with Node.js

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/anushaazmeera006-create/task-management-system.git
cd task-management-system
```

#### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

#### 3. Configure Environment Variables
Edit the `.env` file in the backend folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
```

#### 4. Start Backend Server
```bash
npm run dev
```
Backend will run on `http://localhost:5000` 🟢

#### 5. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```

#### 6. Start Frontend Server
```bash
npm run dev
```
Frontend will run on `http://localhost:3000` 🟢

#### 7. Open in Browser
Navigate to `http://localhost:3000` and start creating tasks! 🎉

---

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user account
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login
Login with existing credentials
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Get current user profile (protected)

### Task Endpoints

#### GET /api/tasks
Get all tasks with filtering, search, pagination, and sorting
- Query params: `status`, `priority`, `search`, `page`, `limit`, `sortBy`, `sortOrder`

#### POST /api/tasks
Create a new task
```json
{
  "title": "Complete project",
  "description": "Finish the task management system",
  "status": "Todo",
  "priority": "High",
  "dueDate": "2024-12-31"
}
```

#### PUT /api/tasks/:id
Update an existing task

#### PATCH /api/tasks/:id/complete
Mark task as completed

#### DELETE /api/tasks/:id
Delete a task

#### GET /api/analytics
Get task statistics and analytics

---

## 🏗️ Project Structure

```
TaskManager/
├── backend/
│   ├── models/          # Database models (User, Task)
│   ├── routes/          # API routes (auth, tasks, analytics)
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Express server setup
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── context/     # React Context (Auth, Theme)
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components (Login, Signup, Dashboard)
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── index.html       # HTML template
│   ├── package.json     # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
└── README.md            # This file
```

---

## 🎓 Learning Journey

Building this project taught me:

### Backend Development
- Setting up RESTful APIs with Express.js
- Implementing JWT authentication from scratch
- Database modeling with Mongoose
- Writing middleware for route protection
- Handling errors gracefully
- Optimizing database queries with indexes

### Frontend Development
- Building complex React applications with hooks
- Managing state with Context API
- Implementing client-side routing
- Creating responsive layouts with TailwindCSS
- Handling API calls with Axios
- Building reusable components

### Full-Stack Integration
- Connecting frontend to backend APIs
- Handling authentication tokens securely
- Managing loading and error states
- Implementing real-time updates
- Deploying and testing full applications

---

## 🚧 Future Enhancements

I have big plans for this project:

- [ ] **Task categories/tags** for better organization
- [ ] **Kanban board view** for visual task management
- [ ] **Calendar view** to see tasks by date
- [ ] **Task reminders** with notifications
- [ ] **File attachments** for task-related documents
- [ ] **Task comments** for collaboration
- [ ] **Export to CSV/PDF** for reporting
- [ ] **Advanced analytics** with charts and graphs
- [ ] **Email notifications** for task updates
- [ ] **OAuth authentication** (Google, GitHub)
- [ ] **Subtasks** for complex projects
- [ ] **Time tracking** for productivity analysis

---

## 🤝 Contributing

As a student project, I'm always open to learning and improving! If you find any bugs or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License – feel free to use it for learning or inspiration!

---

## 🙏 Acknowledgments

- **TailwindCSS** for the amazing utility-first CSS framework
- **Lucide** for the beautiful icon library
- **The open-source community** for all the amazing resources and tutorials

---

## 📧 Contact

- **GitHub:** [@anushaazmeera006-create](https://github.com/anushaazmeera006-create)
- **Project Link:** [https://github.com/anushaazmeera006-create/task-management-system](https://github.com/anushaazmeera006-create/task-management-system)

---

## ⭐ Star This Project

If you found this project helpful or inspiring, please consider giving it a star! It motivates me to keep building and learning.

---

**Built with ❤️ by a passionate student developer**
