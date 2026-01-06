const Stall = require("../model/stallModel");
const User = require("../model/userModel");
const QRCode = require("qrcode");

const CLIENT_URL = "https://bkfinder.com";

// Add a new stall booking
const addStall = async (req, res) => {
  try {
    const { name, companyName, position, phone, email, place } = req.body;

    const newStall = new Stall({
      name,
      companyName,
      position,
      phone,
      email,
      place,
      registeredAt: new Date(),
    });

    await newStall.save();

    const newUser = new User({
      name,
      phone,
      place,
      cName: companyName,
      registrationType: "stall",
    });

    const cardUrl = `${CLIENT_URL}/card/${newUser._id}`;
    newUser.cardUrl = cardUrl;
    newUser.qr = await QRCode.toDataURL(cardUrl);

    await newUser.save();

    // link stall record to its card user
    newStall.userId = newUser._id;
    await newStall.save();

    res.status(201).json({
      message: "Stall booking submitted successfully!",
      userId: newUser._id,
    });
  } catch (err) {
    console.error("Error saving stall booking:", err);
    res.status(500).json({ error: "Failed to save stall booking" });
  }
};

// Get all stall bookings
const getAllStalls = async (req, res) => {
  try {
    const stalls = await Stall.find().sort({ createdAt: -1 });
    res.status(200).json(stalls);
  } catch (err) {
    console.error("Error fetching stall bookings:", err);
    res.status(500).json({ error: "Failed to fetch stall bookings" });
  }
};

module.exports = { addStall, getAllStalls };