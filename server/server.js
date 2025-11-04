const express = require('express')
const cors = require('cors');
const dbConnection = require('./config/dbconnect');
const router = require('./routes/userRoutes');
require("dotenv").config();



const app = express();
app.use(express.json());
const allowedOrigins = [
    "http://localhost:5173",
  ]
  
  app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }))


app.get("/",(req,res)=>[
  res.json("Hello World")
])

// Connect DB
dbConnection()

app.use("/api/users", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));