const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  twitterId: String,
  name: String,
  screenName: String,
  profileImageUrl: String,
  location: String,
  url: String,
  polls: Array
});
