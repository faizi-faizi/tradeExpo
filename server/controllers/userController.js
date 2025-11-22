const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const User = require("../model/userModel");
const QRCode = require("qrcode")

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
      photo: req.file ? `${process.env.APP_URL}/userPhotos/${req.file.filename}` : "" ,
      registeredAt: new Date(),
    });

    //generate card URL
    const APP_URL = "https://bkfinder.com";
    const cardLink = `${APP_URL}/card/${newUser._id}`
    
    //create QR code 
    const qrImage = await QRCode.toDataURL(cardLink);

    //save QR inside DB
    newUser.qr = qrImage;
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