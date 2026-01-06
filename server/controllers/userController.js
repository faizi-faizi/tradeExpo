const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const User = require("../model/userModel");
const QRCode = require("qrcode");
const { upload_file_to_s3 } = require("../utils/s3_uploader");
const sharp = require("sharp")


const CLIENT_URL = "https://bkfinder.com";

// Add a new user
const addUser = async (req, res) => {
  try {
    const { name, phone, place} = req.body;

    let photoUrl = "";
    if (req.file) {
      // if HEIC/HEIF convert to jpeg buffer
      let bufferToUpload = req.file.buffer;
      const mime = req.file.mimetype;

      if (mime === "image/heic" || mime === "image/heif") {
        // convert to jpeg 
        bufferToUpload = await sharp(req.file.buffer).jpeg({ quality: 90 }).toBuffer();
        // override file metadata for uploader
        req.file.originalname = req.file.originalname.replace(/\.[^/.]+$/, ".jpg");
        req.file.mimetype = "image/jpeg";
        req.file.buffer = bufferToUpload;
      }

      // upload to s3
      const s3Url = await upload_file_to_s3(req.file, "userPhotos");
      photoUrl = s3Url;
    }

    console.log("helllooo", req.file)

    const newUser = new User({
      name,
      phone,
      place,
      photo: photoUrl,
      registrationType: "visitor",
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

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" })
  }
};



module.exports = { addUser, getAllUsers, getUserById };