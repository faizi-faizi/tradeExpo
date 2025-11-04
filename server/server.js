const express = require('express')
const cors = require('cors');
const dbConnection = require('./config/dbconnect');
const router = require('./routes/userRoutes');



const app = express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>[
  res.json("Hello World")
])

// Connect DB
dbConnection()

app.use("/api/users", router);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));