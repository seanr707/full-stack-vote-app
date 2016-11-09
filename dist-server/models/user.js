'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.Schema({
  twitterId: String,
  name: String,
  screenName: String,
  profileImageUrl: String,
  location: String,
  url: String,
  pollsCreated: [_mongoose2.default.Schema.Types.ObjectId],
  pollsVoted: [{
    pollId: _mongoose2.default.Schema.Types.ObjectId,
    optionId: _mongoose2.default.Schema.Types.ObjectId
  }]
});