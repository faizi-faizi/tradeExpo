const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  cName:{
    type: String,
    required: true,
    trim: true,
  },
  cType:{
    type: String,
    required: true,
    trim: true,
  },
  
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;