const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const keys = require('../keys');
module.exports = (models) => {
  passport.use(new TwitterStrategy(
    {
      consumerKey: keys.TWITTER_CONSUMER_KEY,
      consumerSecret: keys.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://127.0.0.1:5050/auth/twitter/callback'
    },
      (token, tokenSecret, profile, done) => {
        const user = {
          token,
          profile
        };

        const id = { twitterId: profile.id };

        models.User.findOne(id, (err, user) => {
          if (err) return err;

          if (!user || user.length === 0) {
            const addUser = new models.User({
              twitterId: profile.id,
              name: profile.displayName,
              screenName: profile.username,
              location: profile._json.location,
              url: profile._json.url,
              profileImageUrl: profile._json.profile_image_url_https
            });

            addUser.save(err => console.error(err));
          } else if (user.name !== profile.displayName ||
            user.profileImageUrl !== profile.profile_image_url_https) {
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
      }
  ));

  // Serialize user in and out of session
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
