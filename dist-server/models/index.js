'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _pollOption = require('./pollOption');

var _pollOption2 = _interopRequireDefault(_pollOption);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pollSchema = _mongoose2.default.Schema({
  title: String,
  desc: String,
  author: {
    id: _mongoose2.default.Schema.Types.ObjectId,
    name: String,
    username: String
  },
  authRequired: Boolean,
  dateAdded: Number,
  dateUpdated: Number,
  options: [_pollOption2.default],
  comments: [_comment2.default]
});

exports.default = function () {
  return {
    Poll: _mongoose2.default.model('Poll', pollSchema),
    PollOption: _mongoose2.default.model('PollOption', _pollOption2.default),
    User: _mongoose2.default.model('User', _user2.default)
  };
};

/*
export const Poll = mongoose.model('Poll', pollSchema);
export const PollOption = mongoose.model('PollOption', pollOptionSchema);
export const User = mongoose.model('User', userSchema);
*/