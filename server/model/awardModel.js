const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    // Optional extras if you ever decide to collect them later
    email: {
      type: String,
      default: "",
      trim: true,
    },
    place: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      default: "",
      trim: true,
    },
    yearsInBusiness: {
      type: Number,
    },
    reason: {
      type: String,
      default: "",
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Award = mongoose.model("Award", awardSchema);

module.exports = Award;
