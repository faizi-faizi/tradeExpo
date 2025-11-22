const express = require('express')
const cors = require('cors');
const dbConnection = require('./config/dbconnect');
const router = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const stallRouter = require('./routes/stallRoutes');
require("dotenv").config();
const path = require('path');


const app = express();
app.use(express.json());
const allowedOrigins = [
    "http://localhost:5173",
    "https://bkfinder.com"
  ]
  
  app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }))


app.get("/",(req,res)=>[
  res.json("Hello World")
])

app.use(
  "/userPhotos",
  express.static(path.join(__dirname, "public/userPhotos"))
);

app.use("/frame", express.static(path.join(__dirname, "public/frame")));

// Connect DB
dbConnection()

app.use("/api/users", router);
app.use("/api/auth", authRouter); 
app.use("/api/stall", stallRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
