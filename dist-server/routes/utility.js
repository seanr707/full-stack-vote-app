'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callback = exports.jsonParser = undefined;

var _bodyParser = require('body-parser');

var jsonParser = exports.jsonParser = (0, _bodyParser.json)();

var callback = exports.callback = function callback(res) {
  return function (err, polls) {
    if (err) {
      console.error(err);
      return res.send(new Error('Issue with server, try again later.'));
    }

    return res.send(polls);
  };
};