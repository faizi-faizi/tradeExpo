const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

const authRouter = router.post("/login", login);

module.exports = authRouter;