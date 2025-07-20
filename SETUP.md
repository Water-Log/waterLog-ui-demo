# WaterLog Authentication Setup

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/waterlog
MONGODB_DB=waterlog

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

## Features Implemented

### 1. User Registration (`/create-account`)
- Multi-step registration form
- Company creation first, then user creation
- Automatic login after successful registration
- Redirects to `/manager` page after completion

### 2. Authentication System
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (Manager, Shipholder, Technician)
- Persistent sessions using localStorage

### 3. API Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### 4. Database Schemas
- **Company**: Stores company information
- **User**: Stores user information with role and company reference
- **Role**: Enum for user roles (Manager, Shipholder, Technician)

## Usage

1. Start the development server: `npm run dev`
2. Navigate to `/create-account` to register a new company and user
3. After registration, you'll be automatically logged in and redirected to `/manager`
4. Use the login page to authenticate existing users

## Security Features

- Password hashing with bcryptjs (12 salt rounds)
- JWT tokens with 7-day expiration
- Input validation and sanitization
- Duplicate email/company prevention
- Role-based access control 