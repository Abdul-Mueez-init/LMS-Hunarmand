# LMS Hunarmand

## Overview
LMS Hunarmand is a professional MERN stack Learning Management System (LMS) crafted with a focus on modern UI/UX principles. It supports three distinct role-based sub-systems:
- **Student**: Enroll in courses and track your progress.
- **Instructor**: Create and publish comprehensive courses using an intuitive wizard.
- **Admin**: Manage users, oversee platform analytics, and maintain system health.

## Tech Stack
- **Frontend**: React, Vite, Framer Motion, Lucide React, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Security & Auth**: JWT (JSON Web Tokens), Bcrypt for password hashing

## Screenshots
*(Please add your screenshot images to a `docs/` folder in the root directory)*

### Home Page
![Home Page](./docs/home.png)

### Student Dashboard
![Student Dashboard](./docs/student.png)

### Admin Dashboard
![Admin Dashboard](./docs/admin.png)

### Instructor Dashboard
![Instructor Dashboard](./docs/instructor.png)

## Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Clone the repository
```bash
git clone https://github.com/Abdul-Mueez-init/LMS-Hunarmand.git
cd LMS-Hunarmand
```

### 2. Install Dependencies
Navigate to both the frontend and backend directories and install the necessary packages.

**Backend Setup:**
```bash
cd backend
npm install
```

**Frontend Setup:**
```bash
cd ../frontend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `backend/` directory and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Application
Start the backend and frontend servers.

**Run Backend:**
```bash
cd backend
npm run dev
```

**Run Frontend:**
```bash
cd frontend
npm run dev
```
