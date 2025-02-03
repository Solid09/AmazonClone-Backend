const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "https://localhost:3000/uploads/defaultPFImg.jpg",
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  contactInfo: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
