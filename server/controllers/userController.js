const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const User = require("../model/userModel");
const QRCode = require("qrcode")

// const SERVER_URL = "http://localhost:8080";
const SERVER_URL = "https://admin.bkfinder.com";
const CLIENT_URL = "https://bkfinder.com";

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
      photo: req.file ? `${SERVER_URL}/userPhotos/${req.file.filename}` : "",
    });

    const cardUrl = `${CLIENT_URL}/card/${newUser._id}`;
    newUser.cardUrl = cardUrl;
    newUser.qr = await QRCode.toDataURL(cardUrl); 

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully!",
      userId: newUser._id,
    });

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

const getUserById = async (req, res)=>{
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"User not found"});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error:"Error fetching user"})
  }
};



module.exports = { addUser, getAllUsers, getUserById };