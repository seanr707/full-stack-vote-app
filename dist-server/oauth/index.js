'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportTwitter = require('passport-twitter');

var _keys = require('../keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (models) {
  _passport2.default.use(new _passportTwitter.Strategy({
    consumerKey: _keys.TWITTER_CONSUMER_KEY,
    consumerSecret: _keys.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:5050/auth/twitter/callback'
  }, function (token, tokenSecret, profile, done) {
    var user = {
      token: token,
      profile: profile
    };

    var id = { twitterId: profile.id };

    models.User.findOne(id, function (err, user) {
      if (err) return err;

      if (!user || user.length === 0) {
        var addUser = new models.User({
          twitterId: profile.id,
          name: profile.displayName,
          screenName: profile.username,
          location: profile._json.location,
          url: profile._json.url,
          profileImageUrl: profile._json.profile_image_url_https
        });

        addUser.save(function (err) {
          return console.error(err);
        });
      } else if (user.name !== profile.displayName || user.profileImageUrl !== profile.profile_image_url_https) {
        user = {
          twitterId: profile.id,
          name: profile.displayName,
          screenName: profile.username,
          location: profile._json.location,
          url: profile._json.url,
          profileImageUrl: profile._json.profile_image_url_https
        };
        models.User.findOneAndUpdate(id, user);
      }
    });

    done(null, user);
  }));

  // Serialize user in and out of session
  _passport2.default.serializeUser(function (user, cb) {
    cb(null, user);
  });

  _passport2.default.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};