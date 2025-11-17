const mongoose = require("mongoose");

const stallBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      default: "",
      trim: true,
    },

    position: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    place: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const StallBooking = mongoose.model("StallBooking", stallBookingSchema);

module.exports = StallBooking;