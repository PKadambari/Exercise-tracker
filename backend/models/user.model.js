const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  height: {
    type: Number, 
    required: true
  },
  weight: {
    type: Number, 
    required: true
  },
  bmi_status: {
    type: String
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;