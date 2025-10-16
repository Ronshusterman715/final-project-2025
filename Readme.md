# Club Finder

A comprehensive full-stack web application for discovering and managing local clubs. Built as a final project for Full Stack Web Development course.

## 📋 Project Overview

Club Finder is a platform that helps users discover sports clubs, hobby groups, social clubs, and more in their area. The application features user authentication, advanced search and filtering capabilities, personal favorites system, and comprehensive admin management tools for creating, editing, and deleting clubs.

## ✨ Key Features

- **User Management**: Secure registration and login with JWT authentication and "Remember Me" functionality
- **Advanced Search & Filtering**: Search clubs by name and filter by type, location (country/city), and age requirements
- **Personal Favorites**: Save your favorite clubs with persistent storage across devices
- **Admin Panel**: Full CRUD operations for administrators to create, edit, and delete clubs
- **Multiple View Modes**: Toggle between card and table view with saved preferences
- **Responsive Design**: Mobile-friendly interface built with Bootstrap 5
- **Role-Based Access**: Different capabilities for regular users and administrators
- **Real-time Updates**: Immediate UI updates when liking/unliking clubs or managing content

## 🛠️ Technology Stack

### Backend

- Node.js & Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt for password hashing
- Joi for validation
- Morgan for logging

### Frontend

- React 18 with TypeScript
- Vite
- React Router v6
- Axios
- Bootstrap 5
- Font Awesome icons
- Formik - Form handling
- Yup - Form validation
- React Toastify - Notifications
- jwt-decode - JWT token decoding

## 📁 Project Structure

```
club-finder/
├── backend/          # Node.js/Express backend
│   ├── auth/         # Authentication services
│   ├── clubs/        # Club routes, models, and validation
│   ├── users/        # User routes, models, and validation
│   ├── DB/           # Database connection
│   └── README.md     # Backend documentation
├── frontend/         # React frontend
│   └── fullstack-react/
│       ├── src/
│       │   ├── components/
│       │   ├── services/
│       │   ├── interfaces/
│       │   └── utils/
│       └── README.md # Frontend documentation
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone
cd club-finder
```

2. **Set up Backend**

```bash
cd backend
npm install
```

Create a `.env` file (see backend/README.md for details)

3. **Set up Frontend**

```bash
cd frontend/fullstack-react
npm install
```

4. **Run the Application**

Terminal 1 (Backend):

```bash
cd backend
npm start
```

Terminal 2 (Frontend):

```bash
cd frontend/fullstack-react
npm run dev
```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## 📚 Documentation

- [Backend Documentation](./backend/README.md) - API endpoints, database schema, and backend setup
- [Frontend Documentation](./frontend/fullstack-react/Frontend-readme.md) - Component structure and frontend configuration

## 👥 User Roles

### Regular Users

- Browse all clubs
- Search and filter clubs
- View club details
- Create an account
- Save favorite clubs
- Edit their own profile

### Admin Users

- All regular user capabilities
- Create new clubs
- Edit existing clubs
- Delete clubs
- View all users
- Access to Favorites Management page

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Passwords are hashed using bcrypt before storage.

## 📱 Contact

For support or questions:

- Email: support@clubs.com
- Phone: 054-123-4567

## 📄 License

This project was developed as a Full Stack Web Development Final Project.

---

**Version:** 1.0  
**Last Updated:** October 2025
