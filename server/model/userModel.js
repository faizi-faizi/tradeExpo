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
    required: false,
    default: "",
  },
  registrationType: {
    type: String,
    enum: ["visitor", "award", "stall"],
    default: "visitor",
  },
  cName:{
    type: String,
    default:"",
    trim: true,
  },
  cType:{
    type: String,
    default:"",
    trim: true,
  },
  photo:{
    type: String,
    default: "",
  },
  qr: {
  type: String,
  default: "",
},
cardUrl:{
  type: String,
  default: "",
}
  
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;