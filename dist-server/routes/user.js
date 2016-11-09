'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utility = require('./utility');

exports.default = function (app, models) {
  app.route('/users/id/:userId').get(function (req, res) {
    models.User.findById(req.params.userId, function (err, user) {
      if (err) {
        console.error(err);
        return res.send(err);
      }

      models.Poll.find({ 'author.id': req.params.userId }, function (err, polls) {
        if (err) {
          console.error(err);
          return res.send(err);
        }

        // Remove twitter oauth from being sent out
        var sentUser = {
          name: user.name,
          screenName: user.screenName,
          profileImageUrl: user.profileImageUrl,
          location: user.location,
          url: user.url,
          pollsCreated: user.pollsCreated,
          pollsVoted: user.pollsVoted
        };

        return res.send({ user: sentUser, polls: polls.reverse() });
      });
    });
  });
  app.route('/user/:userId').get(function (req, res) {
    models.User.findById(req.params.userId, function (err, user) {
      if (err) {
        console.error(err);
        return res.send(err);
      }

      models.Poll.find({ 'author.id': req.params.userId }, function (err, polls) {
        if (err) {
          console.error(err);
          return res.send(err);
        }

        return res.render('user', { user: user, polls: polls });
      });
    });
  });
};