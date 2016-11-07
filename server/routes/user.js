import { callback, jsonParser } from './utility';

export default (app, models) => {
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
