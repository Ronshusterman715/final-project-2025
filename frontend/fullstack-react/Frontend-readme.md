# Frontend - Club Finder

React-based frontend application for the Club Finder platform, built with TypeScript, Vite, and Bootstrap.

## 🛠️ Technology Stack

- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Vite** - Fast build tool and development server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **Bootstrap 5** - CSS framework for responsive design
- **Font Awesome** - Icon library
- **Session Storage** - Client-side storage for user data

## 📁 Project Structure

```
frontend/fullstack-react/
├── public/
│   └── images/              # Static images
├── src/
│   ├── components/
│   │   ├── about/          # About page components
│   │   ├── clubs/          # Club-related components
│   │   ├── users/          # User-related components
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── Footer.tsx      # Footer component
│   │   └── ...
│   ├── services/
│   │   ├── clubsService.ts  # Club API calls
│   │   ├── usersService.ts  # User API calls
│   │   └── ...
│   ├── interfaces/
│   │   ├── clubs/
│   │   │   └── Club.ts     # Club type definitions
│   │   └── users/
│   │       └── User.ts     # User type definitions
│   ├── utils/
│   │   └── interceptors/
│   │       └── axios-interceptor.ts  # Axios configuration
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. Navigate to the frontend directory:

```bash
cd frontend/fullstack-react
```

2. Install dependencies:

```bash
npm install
```

3. Configure the backend API URL:

Edit `src/utils/interceptors/axios-interceptor.ts` if needed:

```typescript
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Your backend URL
});
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Features & Pages

### Public Pages

**Home Page** (`/`)

- Browse featured clubs
- Search functionality
- View popular clubs

**About Page** (`/about`)

- Project information
- Feature highlights
- Technology stack details
- Contact information
- User guide

**Login Page** (`/login`)

- User authentication
- Remember me option
- Link to registration

**Register Page** (`/register`)

- New user registration form
- Form validation
- Password strength requirements

### Protected Pages (Authentication Required)

**Favorites Page** (`/favorites`)

- View saved favorite clubs
- Quick access to liked clubs
- Like/unlike functionality

**User Profile** (`/users/:id/edit`)

- Edit user information
- Update profile details
- Change password

### Admin-Only Pages

**Create Club** (`/clubs/create`)

- Form to create new clubs
- Image upload
- Address input
- Validation

**Edit Club** (`/clubs/:id/edit`)

- Update club information
- Modify club details
- Admin authorization required

**View Club** (`/clubs/:id`)

- Detailed club information
- Contact details
- Location information
- Like/unlike button
- Edit/Delete buttons (admin only)

## 🧩 Key Components

### Navigation (`Navbar.tsx`)

Dynamic navigation bar that changes based on user authentication status and role:

**Not Logged In:**

- App Name
- About
- Register
- Login
- Search Bar

**Logged In (Regular User):**

- Profile Image
- App Name
- About
- Favorite Clubs
- Logout
- Search Bar

**Logged In (Admin):**

- Profile Image
- App Name
- About
- Create Club Card
- Logout
- Search Bar

### Footer (`Footer.tsx`)

Displays:

- About Us section
- Quick links (dynamic based on user role)
- Contact information
- Copyright notice

### Club Components

**ClubCard** - Display individual club information

- Club image
- Name and description
- Type and age requirement
- Contact information
- Like button
- Admin actions (edit/delete)

### User Components

**UserForm** - Handle user registration and profile editing
**LoginForm** - User authentication

## 🔐 Authentication Flow

1. **Registration**

   - User submits registration form
   - Data validated on frontend and backend
   - User account created
   - Redirect to login

2. **Login**

   - User enters credentials
   - Backend validates and returns JWT token
   - Token stored in session storage
   - User data stored in session storage
   - Redirect to home page

3. **Authenticated Requests**

   - Axios interceptor adds token to request headers
   - Backend validates token
   - Returns requested data or error

4. **Logout**
   - Clear session storage
   - Redirect to home page

## 📡 API Integration

### Axios Interceptor

The application uses an Axios interceptor to automatically add authentication tokens to requests:

```typescript
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});
```

### Services

**clubsService.ts**

- `getAllClubs()` - Fetch all clubs
- `getClubById(id)` - Get specific club
- `createClub(club)` - Create new club (admin)
- `updateClub(id, club)` - Update club (admin)
- `deleteClub(id)` - Delete club (admin)
- `likeUnlikeClub(id)` - Toggle like status
- `getFavoriteClubs()` - Get user's favorite clubs

**usersService.ts**

- User registration
- User login
- Get user by ID
- Update user
- Delete user
- Get all users (admin)

## 🎨 Styling

### Bootstrap 5

The application uses Bootstrap 5 for responsive design and UI components:

- Grid system for layout
- Cards for club display
- Forms for user input
- Navbar and navigation
- Buttons and alerts

### Font Awesome

Icons are provided by Font Awesome 7.0.1:

```html

```

### Custom CSS

Additional styles are defined in:

- `index.css` - Global styles
- Component-level styles (if any)

## 🔍 Search & Filter

The application includes a search bar that allows users to filter clubs by:

- Club name
- Club type
- Description
- Location

## 💾 Data Storage

### Session Storage

The application stores the following in session storage:

- `token` - JWT authentication token
- `user` - User object with ID, name, email, and isAdmin status

### User Object Structure

```typescript
interface User {
  _id: string;
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  email: string;
  phone: string;
  image?: {
    url: string;
    alt: string;
  };
  address?: Address;
  isAdmin: boolean;
}
```

### Club Object Structure

```typescript
interface Club {
  _id: string;
  name: string;
  description: string;
  type: string;
  ageRequirement: string;
  phone: string;
  email: string;
  openHours: string;
  openDays: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip?: string;
  };
  likes: string[];
  userId: string;
  createdAt: Date;
}
```

## 🛡️ Form Validation

### Registration Form

- First name: 2-256 characters, required
- Middle name: 2-256 characters, optional
- Last name: 2-256 characters, required
- Phone: 9-11 characters, required
- Email: Valid email format, required
- Password: 8-20 characters, must contain:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (@$!%\*?&)

### Club Creation Form

- Name: 2-256 characters, required
- Description: 2-256 characters, required
- Type: 2-256 characters, required
- Age Requirement: 1-11 characters, required
- Phone: 9-11 characters, Israeli format, required
- Email: Valid email format, required
- Open Days: 2-256 characters, required
- Open Hours: 2-256 characters, required
- Image URL: 14+ characters
- Image Alt: 2-256 characters
- Address fields: All required

## 🔧 Development

### TypeScript Configuration

The project uses TypeScript with strict type checking. Type definitions are located in the `interfaces/` directory.

### Vite Configuration

Vite is configured for fast HMR (Hot Module Replacement) and optimized production builds.

### Environment Variables

If needed, create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:3000
```

Update the axios interceptor to use this:

```typescript
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
```

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px-1199px)
- Mobile (320px-767px)

## 🐛 Troubleshooting

### Development Server Won't Start

- Check if port 5173 is already in use
- Try running with a different port: `npm run dev -- --port 3001`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### API Connection Issues

- Verify backend server is running
- Check API URL in axios interceptor
- Ensure CORS is properly configured in backend

### Authentication Problems

- Clear session storage
- Check if token is expired
- Verify token format in request headers

### Build Errors

- Run `npm run build` to see detailed error messages
- Check TypeScript errors: `npx tsc --noEmit`
- Ensure all dependencies are installed

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "bootstrap": "^5.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "typescript": "^5.x",
    "vite": "^5.x"
  }
}
```

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` directory with optimized production files.

### Preview Production Build

```bash
npm run preview
```

### Deployment Platforms

The application can be deployed to:

- Vercel
- Netlify
- Render
- GitHub Pages
- Any static hosting service

**Important:** Update the backend API URL for production environment.

## 📞 Support

For questions or issues, contact: support@clubs.com

---

**Version:** 1.0  
**Last Updated:** October 2025
