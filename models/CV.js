const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  basicDetails: {
    image: String,
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    intro: String,
  },

  education: [
    {
      degree: String,
      institution: String,
      percentage: String,
      year: String,
    },
  ],

  experience: [
    {
      organization: String,
      location: String,
      position: String,
      ctc: String,
      joiningDate: String,
      leavingDate: String,
      technologies: String,
    },
  ],

  projects: [
    {
      title: String,
      teamSize: String,
      duration: String,
      technologies: String,
      description: String,
    },
  ],

  skills: [
    {
      name: String,
      proficiency: Number,
    },
  ],

  socialProfiles: [
    {
      platform: String,
      link: String,
    },
  ],
  paid: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('CV', cvSchema);
