const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  title: String,
  votes: Number
});
