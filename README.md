# 🍽️ Restaurant & Table Reservation System

## 📌 Project Overview

This is a full-stack **Restaurant & Table Reservation System** that allows users to browse food items, make table reservations, and manage orders online.

The application provides both **user-side features** and an **admin panel** for managing restaurant operations.

---

## 🚀 Features

### 👤 User Features

* Browse menu (Biryani, Starters, Beverages, etc.)
* User Signup & Login (JWT Authentication)
* Book table reservations
* View reservation details
* Add items to cart (optional)

### 🛠️ Admin Features

* Add / Edit / Delete food items
* Manage reservations
* View user data
* Dashboard for restaurant management

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT (JSON Web Token)
* bcrypt (Password Hashing)

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder:

PORT=5000
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret_key

---

## 📁 Folder Structure

restaurant-project/
│
├── frontend/
├── backend/
├── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

git clone https://github.com/your-username/your-repo-name.git

### 2️⃣ Install dependencies

Backend:
cd backend
npm install

Frontend:
cd frontend
npm install

---

### 3️⃣ Run the project

Backend:
npm start

Frontend:
npm run dev

---

## 🔑 API Endpoints (Sample)

### Auth

POST /api/auth/signup
POST /api/auth/login

### Reservations

POST /api/reservation
GET /api/reservation

---

## 🎯 Future Enhancements

* Online payment integration
* Email notifications for booking
* Real-time table availability
* Mobile responsive UI improvements

---

## 👩‍💻 Author

Madhuri Singidi

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
