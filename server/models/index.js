const mongoose = require('mongoose');

const userSchema = require('./user');
const pollOptionSchema = require('./pollOption');
const commentSchema = require('./comment');

const pollSchema = mongoose.Schema({
  title: String,
  desc: String,
  author: {
    id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  date_added: Number,
  updated: Number,
  options: [pollOptionSchema],
  comments: [commentSchema]
});

module.exports = () => {
  return {
    Poll: mongoose.model('Poll', pollSchema),
    PollOption: mongoose.model('PollOption', pollOptionSchema),
    User: mongoose.model('User', userSchema)
  };
};
