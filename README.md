# User Management Application

This project is a User Management application built with the MERN stack. It includes features for user registration, login, referral management, and profile updates.

## Project Structure

### Backend Directory Structure

```
backend/
├── config/
│   ├── db.js               // MongoDB connection
│   └── auth.js             // JWT token and middleware for auth
├── controllers/
│   └── userController.js    // User logic like save, update, referral points
├── models/
│   ├── User.js             // User model schema
│   └── Referral.js         // Referral code schema
├── routes/
│   └── userRoutes.js       // All routes for user APIs
├── middlewares/
│   └── authMiddleware.js    // Token validation and security checks
├── utils/
│   └── upload.js           // Multer for handling profile image uploads
└── server.js               // Entry point of the application
```

### Frontend Directory Structure

```
client/
├── src/
│   ├── components/         // Reusable components
│   ├── pages/              // Main pages like Login, ReferralUserList, etc.
│   ├── context/            // Context API for global state management
│   └── services/           // Services for API calls
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB (running locally or remotely)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install backend dependencies**:
   Navigate to the `backend` directory and run:
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**:
   Navigate to the `client` directory and run:
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Database Configuration**:
   Update the MongoDB connection string in `backend/config/db.js` with your MongoDB URI.

2. **JWT Secret**:
   In `backend/config/auth.js`, set up your JWT secret key for token signing.

### Running the Application

1. **Start the backend server**:
   From the `backend` directory, run:
   ```bash
   npm start
   ```

2. **Start the frontend application**:
   From the `client` directory, run:
   ```bash
   npm start
   ```

3. **Access the application**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## API Endpoints

The application has several API endpoints for user management:

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Login an existing user.
- **GET /api/users/referrals**: Get the list of referrals for the authenticated user.
- **PUT /api/users/update**: Update user profile information.
- **GET /api/users/:id**: Get user details by ID.

Refer to the backend code in `backend/routes/userRoutes.js` for a complete list of available endpoints.

## Usage

- Register a new user to access the application features.
- Use the referral code functionality to invite others.
- Update your profile information as needed.
- Ensure to handle JWT tokens securely for authentication.

## Notes

- The application includes middleware for JWT validation and secure token handling.
- Multer is used for handling image uploads in user profiles.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MERN Stack Guide](https://www.mongodb.com/mern-stack)

## License

This project is licensed under the MIT License.
