# Backend - Club Finder API

RESTful API backend for the Club Finder application built with Node.js, Express, and MongoDB.

## 🛠️ Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Joi** - Data validation
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
backend/
├── auth/
│   ├── authService.js          # Authentication middleware
│   └── providers/
│       └── jwt.js              # JWT token generation and verification
├── clubs/
│   ├── routes/
│   │   └── clubRestController.js  # Club API routes
│   ├── models/
│   │   ├── clubsAccessDataService.js  # Club data access layer
│   │   └── mongodb/
│   │       └── Club.js         # Club schema
│   ├── validation/
│   │   └── clubValidationService.js  # Club validation rules
│   └── helpers/
│       └── normalizeClub.js    # Club data normalization
├── users/
│   ├── routes/
│   │   └── userRestController.js  # User API routes
│   ├── models/
│   │   ├── usersAccessDataService.js  # User data access layer
│   │   └── mongodb/
│   │       └── User.js         # User schema
│   ├── validation/
│   │   └── userValidationService.js  # User validation rules
│   └── helpers/
│       └── returnUser.js       # User data formatting
├── DB/
│   ├── dbService.js            # Database connection manager
│   └── mongoDB/
│       ├── connectToAtlas.js   # MongoDB Atlas connection
│       └── connectToMongodbLocally.js  # Local MongoDB connection
├── middlewares/
│   └── cors.js                 # CORS configuration
├── logger/
│   └── loggerService.js        # Morgan logger setup
├── utils/
│   └── handleErrors.js         # Error handling utilities
├── router/
│   └── router.js               # Main API router
├── logs/                       # Application logs
├── public/                     # Static files
├── app.js                      # Application entry point
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend root directory:

```bash
touch .env
```

4. Configure environment variables (see Configuration section below)

5. Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000` (or the PORT specified in .env)

## ⚙️ Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
ENVIRONMENT=development      # 'development' or 'production'
DB=MONGODB                   # Database type

# MongoDB Connection Strings
MONGODB_LOCAL_URI=mongodb://localhost:27017/club-finder
MONGODB_ATLAS_URI=your_mongodb_atlas_connection_string

# Authentication
TOKEN_GENERATOR=jwt
SECRET_KEY=your_secret_key_here_at_least_32_characters

# Validation
VALIDATOR=joi

# Logging
LOGGER=morgan
```

### Environment Variables Explained

- `PORT` - Server port (default: 3000)
- `ENVIRONMENT` - Set to 'development' for local DB or 'production' for Atlas
- `DB` - Database type (currently supports 'MONGODB')
- `MONGODB_LOCAL_URI` - Connection string for local MongoDB
- `MONGODB_ATLAS_URI` - Connection string for MongoDB Atlas
- `TOKEN_GENERATOR` - Authentication method (currently 'jwt')
- `SECRET_KEY` - Secret key for JWT token generation (use a strong, random string)
- `VALIDATOR` - Validation library (currently 'joi')
- `LOGGER` - HTTP request logger (currently 'morgan')

## 📡 API Endpoints

### Authentication

All protected routes require an `x-auth-token` header with a valid JWT token.

### Users

| Method | Endpoint          | Auth Required | Admin Only | Description         |
| ------ | ----------------- | ------------- | ---------- | ------------------- |
| POST   | `/users/register` | No            | No         | Register a new user |
| POST   | `/users/login`    | No            | No         | Login user          |
| GET    | `/users/:id`      | Yes           | Self/Admin | Get user by ID      |
| GET    | `/users`          | Yes           | Yes        | Get all users       |
| PUT    | `/users/:id`      | Yes           | Self/Admin | Update user         |
| DELETE | `/users/:id`      | Yes           | Self/Admin | Delete user         |

### Clubs

| Method | Endpoint           | Auth Required | Admin Only | Description               |
| ------ | ------------------ | ------------- | ---------- | ------------------------- |
| POST   | `/clubs`           | Yes           | Yes        | Create new club           |
| GET    | `/clubs`           | No            | No         | Get all clubs             |
| GET    | `/clubs/favorites` | Yes           | No         | Get user's favorite clubs |
| GET    | `/clubs/:id`       | No            | No         | Get club by ID            |
| PUT    | `/clubs/:id`       | Yes           | Yes        | Update club               |
| DELETE | `/clubs/:id`       | Yes           | Yes        | Delete club               |
| PATCH  | `/clubs/:id`       | Yes           | No         | Like/unlike club          |

## 📝 Data Models

### User Schema

```javascript
{
  name: {
    first: String (2-256 chars, required),
    middle: String (2-256 chars, optional),
    last: String (2-256 chars, required)
  },
  phone: String (9-11 chars, required),
  email: String (valid email, required),
  password: String (8-20 chars, required),
  image: {
    url: String (14+ chars),
    alt: String (2-256 chars)
  },
  address: Object (optional),
  isAdmin: Boolean (default: false),
  createdAt: Date
}
```

**Password Requirements:**

- 8-20 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%\*?&)

### Club Schema

```javascript
{
  name: String (2-256 chars, required),
  description: String (2-1024 chars, required),
  type: String (2-256 chars, required),
  ageRequirement: String (1-11 chars, required),
  phone: String (9-11 chars, required),
  email: String (valid email, required),
  openDays: String (2-256 chars, required),
  openHours: String (2-256 chars, required),
  image: {
    url: String (14+ chars),
    alt: String (2-256 chars)
  },
  address: {
    country: String (2-256 chars, required),
    city: String (2-256 chars, required),
    street: String (2-256 chars, required),
    houseNumber: Number (min 1, required),
    floor: Number (min 0, optional)
  },
  likes: Array of user IDs,
  createdAt: Date
}
```

## 🔒 Authentication & Authorization

### JWT Authentication

The API uses JWT tokens for authentication. After successful login, the server returns a token that must be included in the `x-auth-token` header for protected routes.

**Token Payload:**

```javascript
{
  _id: user._id,
  isAdmin: user.isAdmin
}
```

### Authorization Levels

1. **Public** - No authentication required
2. **Authenticated** - Valid JWT token required
3. **Self/Admin** - User can only access their own data unless they're an admin
4. **Admin Only** - Only admin users can access

## 🧪 Validation

All inputs are validated using Joi schemas. Validation errors return a 400 status with detailed error messages.

### User Validation

- Email format validation
- Phone number validation (Israeli format)
- Strong password requirements
- Name length constraints

### Club Validation

- Required fields validation
- String length constraints
- Image URL validation
- Address format validation

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- CORS configuration for allowed origins
- Input validation and sanitization
- Error handling middleware
- Request logging

## 📊 Logging

Morgan middleware logs all HTTP requests. Logs are stored in the `logs/` directory, organized by date.

## ⚠️ Error Handling

The API uses a centralized error handling system:

```javascript
{
  status: Number,        // HTTP status code
  message: String,       // Error description
  type: String          // Error type (validation, authentication, etc.)
}
```

Common status codes:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## 🔧 Development

### Running in Development Mode

```bash
npm start
```

### Database Connection

The application supports both local MongoDB and MongoDB Atlas:

**Local Development:**

```env
ENVIRONMENT=development
MONGODB_LOCAL_URI=mongodb://localhost:27017/club-finder
```

**Production:**

```env
ENVIRONMENT=production
MONGODB_ATLAS_URI=your_atlas_connection_string
```

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "chalk": "^4.1.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.1",
  "express": "^5.1.0",
  "joi": "^18.0.1",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.18.0",
  "morgan": "^1.10.1"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check if the database name in connection string is correct
- Verify network access in MongoDB Atlas settings

### Authentication Errors

- Ensure SECRET_KEY is set in .env
- Check if token is included in `x-auth-token` header
- Verify token hasn't expired

### CORS Errors

- Check if frontend URL is added to CORS whitelist in `middlewares/cors.js`
- Default allowed origins: `http://localhost:5173` and production URL

## 📞 Support

For questions or issues, contact: support@clubs.com

---

**Version:** 1.0  
**Last Updated:** October 2025
