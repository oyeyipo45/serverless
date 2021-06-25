const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  created: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('ServerlessUsers', UserSchema);
