const express = require("express");
const router = express.Router();
const { addUser, getAllUsers, downloadExcel } = require("../controllers/userController");
const { login } = require("../controllers/authController");
const upload = require("../middleware/uploadUserPhoto");

router.post("/register",upload.single("photo"), addUser);
router.get("/list", getAllUsers);
router.post("/login", login);

module.exports = router;