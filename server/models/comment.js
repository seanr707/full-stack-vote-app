const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  text: String,
  author: {
    id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  dateAdded: Number
});
