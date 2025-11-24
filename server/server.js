const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/dbconnect');
const router = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const stallRouter = require('./routes/stallRoutes');
require("dotenv").config();
const path = require('path');

const app = express();


// FIXED CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://bkfinder.com",
  "https://www.bkfinder.com",
  "https://admin.bkfinder.com",
];

app.use(cors({
  origin: allowedOrigins,
  credentials:true,
}));

app.use("/userPhotos", express.static(path.join(__dirname, "public/userPhotos")));
app.use("/frame", express.static(path.join(__dirname, "public/frame")));

dbConnection();

app.use("/api/users", router);
app.use("/api/auth", authRouter);
app.use("/api/stall", stallRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SERVER RUNNING → ${PORT}`));