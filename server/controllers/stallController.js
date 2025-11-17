const Stall = require("../model/stallModel");

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
    res.status(201).json({ message: "Stall booking submitted successfully!" });
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