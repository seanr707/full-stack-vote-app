'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.Schema({
  text: String,
  author: {
    id: _mongoose2.default.Schema.Types.ObjectId,
    name: String,
    username: String
  },
  votes: {
    up: Number,
    down: Number
  },
  dateAdded: Number,
  dateUpdated: Number
});