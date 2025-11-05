const express = require("express");
const router = express.Router();
const { addUser, getAllUsers, downloadExcel } = require("../controllers/userController");
const { login } = require("../controllers/authController");

router.post("/register", addUser);
router.get("/list", getAllUsers);
router.post("/login", login);

module.exports = router;