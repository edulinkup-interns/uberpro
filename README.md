🚖 GoRide – Full-Stack Uber Clone

GoRide is a real-time cab booking platform inspired by Uber, built using the MERN stack.
It enables seamless ride booking, driver matching, and live trip tracking with real-time communication.

🌟 Key Highlights

🔐 Secure JWT Authentication for riders & drivers

🚗 Book rides and match with nearby drivers

🗺️ Live location tracking using Google Maps API

🔄 Real-time updates via Socket.io

💸 Dynamic fare calculation

🧾 Ride history & trip management

📱 Fully responsive UI

🛠️ Tech Stack
🔹 Frontend

React.js (Hooks + Context API)

Tailwind CSS

Google Maps API

Axios

🔹 Backend

Node.js + Express.js

MongoDB + Mongoose

Socket.io

JWT Authentication

REST APIs

📁 Project Structure
🔹 Backend (/backend)
backend/
├── controllers/   → Business logic
├── models/        → Mongoose schemas
├── db/            → DB connection
├── middleware/    → Auth & error handling
├── routes/        → API routes
├── services/      → Fare & notification logic
├── socket/        → Real-time events
├── app.js         → Express config
└── server.js      → Entry point

🔹 Frontend (/frontend)
frontend/
├── public/
├── src/
│   ├── pages/        → Screens (Home, Login, Dashboard)
│   ├── components/   → Reusable UI
│   ├── context/      → Global state
│   ├── assets/       → Images & icons
│   └── App.js        → Routing

🚀 Getting Started
🔹 Prerequisites

Node.js (v16+)

MongoDB (Local/Atlas)

Google Maps API Key

🔹 Installation
1️⃣ Clone Repo
git clone https://github.com/sakshi04-ui/GoRide.git
cd GoRide

2️⃣ Backend Setup
cd backend
npm install


Create .env file in backend/

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GOOGLE_MAPS_API_KEY=your_api_key


Start backend:

npm run dev

3️⃣ Frontend Setup
cd ../frontend
npm install
npm start

🌐 Running App

Frontend → http://localhost:3000

Backend → http://localhost:5000

🔐 Environment Variables
PORT=5000
MONGO_URI=mongodb+srv://your-cluster-url
JWT_SECRET=supersecretkey
GOOGLE_MAPS_API_KEY=your-api-key

🧠 Future Improvements

💳 Payment Integration (Stripe / Razorpay)

🧑‍💼 Admin Dashboard

🌍 Multi-language Support

🔔 Push Notifications (Firebase)

🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and create a PR.

📄 License

This project is licensed under the MIT License.
