const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: false },
  contactNumber: { type: String },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
