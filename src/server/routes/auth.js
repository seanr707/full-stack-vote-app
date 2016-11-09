import passport from 'passport';
import { callback } from './utility';

export default (app, models) => {
  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(
      passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/'
      })
    );

  app.route('/auth/check')
    .get((req, res) => {
      if (!req.session.passport) {
        return res.send(false);
      }

      const id = { twitterId: req.session.passport.user.profile.id };
      return models.User.findOne(id, callback(res));
    });
};
