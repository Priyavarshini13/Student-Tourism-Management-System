🌍 Student Tourism Management System

A Full-Stack MERN (MongoDB, Express.js, React.js, Node.js) web application developed for managing student tourism packages and online bookings.

The system provides a centralized platform where students can explore Tamil Nadu tourism destinations, register/login securely, and book tourism packages through an interactive and responsive web interface.

🚀 Live Deployment
Frontend (Vercel) : https://student-tourism-management-system.vercel.app

Backend API (Render): https://student-tourism-management-system.onrender.com

MongoDB Atlas: https://cloud.mongodb.com

📌 Features
👤 Authentication Module
Student Registration
Secure Login
JWT Authentication
Protected Routes
Password Encryption using bcrypt

🗺️ Tourism Management Module
Dynamic Tourism Package Display
Tamil Nadu Tourism Destinations
Trip Search & Filtering
Responsive Trip Cards
Destination Details
Included Destinations
Ooty
Kodaikanal
Yercaud
Rameswaram
Kanyakumari
Valparai
Mahabalipuram
Marina Beach

📖 Booking Management Module
Online Trip Booking
Booking Confirmation
Booking History
Wallet Balance Management
Booking Cancellation

⭐ Review Module
Add Reviews
Ratings & Feedback
Trip Review Management

🛠️ Tech Stack
Frontend
React.js
Axios
React Router DOM
HTML
CSS
JavaScript

Backend
Node.js
Express.js
JWT Authentication
bcryptjs

Database
MongoDB
Mongoose

External Services
Cloudinary (Image Storage)
Nodemailer (Email Notifications)
Render (Backend Deployment)
Vercel (Frontend Deployment)

📂 Project Structure
Student-Tourism-Management-System/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md

⚙️ Local Installation
Clone Repository
git clone https://github.com/Priyavarshini13/Student-Tourism-Management-System.git

💻 Frontend Setup
cd client
npm install
npm start

Frontend runs on:
http://localhost:3000
🔧 Backend Setup
cd server
npm install
npm start

Backend runs on:
http://localhost:5000

🌐 API Endpoints
Authentication APIs
Register User
POST /api/auth/register
Login User
POST /api/auth/login
Trip APIs
Get All Trips
GET /api/trips
Get Single Trip
GET /api/trips/:id

Booking APIs
Create Booking
POST /api/bookings
Get User Bookings
GET /api/bookings/my
Cancel Booking
PUT /api/bookings/cancel/:id

🔐 Security Features
JWT Authentication
Password Encryption using bcrypt
Protected Routes
Middleware Validation
Error Handling
CORS Support

☁️ MongoDB Atlas Setup
MongoDB Atlas was used as the cloud database service.

Website:
MongoDB Atlas Platform

Steps
Create MongoDB Atlas account
Create Cluster
Create Database User
Allow Network Access
Copy MongoDB URI
Add URI in Render Environment Variables

🚀 Deployment
Frontend Deployment
Platform: Vercel
Configuration
Root Directory: client
Build Command
npm run build
Output Directory
build

Backend Deployment
Platform: Render
Configuration
Root Directory: server
Build Command
npm install
Start Command
npm start

📈 Performance Features
Fast MongoDB Queries
Responsive React UI
Secure Authentication
REST API Communication
Scalable MERN Architecture
Optimized Backend Processing

📊 Observed Results
Faster booking operations
Reduced manual effort
Improved tourism accessibility
Better user experience
Reliable backend performance

🎯 SDG Goals Mapped
SDG 4 – Quality Education
SDG 8 – Decent Work and Economic Growth
SDG 9 – Industry, Innovation and Infrastructure
SDG 11 – Sustainable Cities and Communities

👩‍💻 Developed By
Priyavarshini V

📜 License
This project is developed for educational and academic purposes.
