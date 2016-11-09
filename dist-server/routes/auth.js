'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app, models) {
  app.route('/auth/twitter').get(_passport2.default.authenticate('twitter'));

  app.route('/auth/twitter/callback').get(_passport2.default.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  app.route('/auth/check').get(function (req, res) {
    if (!req.session.passport) {
      return res.send(false);
    }

    var id = { twitterId: req.session.passport.user.profile.id };
    return models.User.findOne(id, (0, _utility.callback)(res));
  });
};