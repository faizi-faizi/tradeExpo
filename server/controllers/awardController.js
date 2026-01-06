const Award = require("../model/awardModel");
const User = require("../model/userModel");
const QRCode = require("qrcode");

const CLIENT_URL = "https://bkfinder.com";

const createAward = async (req, res) => {
  try {
    const {
      name,
      companyName,
      position,
      phone,
      email,
      place,
      category,
      yearsInBusiness,
      reason,
    } = req.body;

    const award = await Award.create({
      name,
      companyName,
      position,
      phone,
      email,
      place,
      category,
      yearsInBusiness,
      reason,
    });

    const newUser = new User({
      name,
      phone,
      place: place || "",
      cName: companyName,
      registrationType: "award",
    });

    const cardUrl = `${CLIENT_URL}/card/${newUser._id}`;
    newUser.cardUrl = cardUrl;
    newUser.qr = await QRCode.toDataURL(cardUrl);

    await newUser.save();

    // link award record to its card user
    award.userId = newUser._id;
    await award.save();

    res.status(201).json({
      award,
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error creating award nomination", error);
    res.status(500).json({ error: "Failed to create award nomination" });
  }
};

const getAwards = async (req, res) => {
  try {
    const awards = await Award.find().sort({ createdAt: -1 });
    res.status(200).json(awards);
  } catch (error) {
    console.error("Error fetching awards", error);
    res.status(500).json({ error: "Failed to fetch award nominations" });
  }
};

module.exports = { createAward, getAwards };
