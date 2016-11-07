import { callback } from './utility';

export default (app, models) => {
  app.route('/users/id/:userId')
  .get((req, res) => {
    models.User.findById(req.params.userId, (err, user) => {
      if (err) {
        console.error(err);
        return res.send(err);
      }

      models.Poll.find({ 'author.id': req.params.userId }, (err, polls) => {
        if (err) {
          console.error(err);
          return res.send(err);
        }

        // Remove twitter oauth from being sent out
        const sentUser = {
          name: user.name,
          screenName: user.screenName,
          profileImageUrl: user.profileImageUrl,
          location: user.location,
          url: user.url,
          pollsCreated: user.pollsCreated,
          pollsVoted: user.pollsVoted
        };

        return res.send({ user: sentUser, polls });
      });
    });
  });
  app.route('/user/:userId')
    .get((req, res) => {
      models.User.findById(req.params.userId, (err, user) => {
        if (err) {
          console.error(err);
          return res.send(err);
        }

        models.Poll.find({ 'author.id': req.params.userId }, (err, polls) => {
          if (err) {
            console.error(err);
            return res.send(err);
          }

          return res.render('user', { user, polls });
        });
      });
    });
};
