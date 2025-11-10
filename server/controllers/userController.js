const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const User = require("../model/userModel");

// Add a new user
const addUser = async (req, res) => {
  try {
    const { name, email, phone, place, cName, cType } = req.body;

    const newUser = new User({
      name,
      email,
      phone,
      place,
      cName,
      cType,
      registeredAt: new Date(),
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Failed to save user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};



module.exports = { addUser, getAllUsers };