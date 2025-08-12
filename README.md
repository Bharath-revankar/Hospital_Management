# Hospital Management System (MERN Stack MVP)

## Features Implemented

* User authentication (JWT-based) with role-based access (patient, doctor, admin)
* Appointment booking and management
* Encrypted medical records storage
* Encrypted billing system
* Real-time messaging between patients and doctors

## Tech Stack

* **Frontend:** React.js with React Router
* **Backend:** Node.js with Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT tokens
* **Encryption:** AES encryption for sensitive data
* **Real-time:** Socket.io for notifications and messaging

## Setup Instructions

### Prerequisites

* Node.js installed
* MongoDB installed and running

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Make sure MongoDB is running on your system.

4. Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`.

## Usage

### User Roles

* **Patient:** Can book appointments, view medical records, view billing, and chat with doctors
* **Doctor:** Can view appointments, add medical records, create bills, and chat with patients
* **Admin:** Can manage all appointments and billing records

### API Endpoints

* `POST /api/users/register` - Register new user
* `POST /api/users/login` - Login user
* `GET /api/users/doctors` - Get all doctors
* `GET /api/users/patients` - Get all patients (protected)
* `POST /api/appointments` - Create appointment (protected)
* `GET /api/appointments` - Get user appointments (protected)
* `POST /api/records` - Create medical record (doctors only)
* `GET /api/records` - Get user medical records (protected)
* `POST /api/billing` - Create billing record (admin/doctor only)
* `GET /api/billing` - Get user billing records (protected)

## Security Features

* Password hashing with `bcrypt`
* JWT token authentication
* AES encryption for medical records and billing data
* Role-based access control

## Real-time Features

* `Socket.io` for real-time chat between patients and doctors
* Notification system for new appointments

## Environment Variables

The `.env` file contains:

* `PORT`: Server port (default: 5000)
* `MONGO_URI`: MongoDB connection string
* `JWT_SECRET`: Secret key for JWT tokens
* `AES_KEY`: AES encryption key (32 bytes hex)
* `AES_IV`: AES initialization vector (16 bytes hex)

## Project Structure

```
hospital-mgmt/
├── client/ # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/ # Login/Register components
│   │   │   ├── dashboard/ # Dashboard components
│   │   │   ├── appointments/
│   │   │   ├── records/
│   │   │   ├── billing/
│   │   │   └── chat/
│   │   └── App.js
│   └── package.json
├── server/ # Node.js backend
│   ├── controllers/ # Business logic
│   ├── models/ # Mongoose schemas
│   ├── routes/ # API endpoints
│   ├── middleware/ # Auth middleware
│   ├── utils/ # Encryption utilities
│   ├── server.js # Main server file
│   └── package.json
└── .env # Environment variables
```

## Next Steps for Production

1. Add input validation and sanitization
2. Implement proper error handling and logging
3. Add rate limiting and security headers
4. Set up production database
5. Add email notifications
6. Implement file upload for medical documents
7. Add comprehensive testing
8. Set up CI/CD pipeline
