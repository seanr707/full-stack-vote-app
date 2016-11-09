import authRoute from './auth';
import commentRoute from './comment';
import pollRoute from './poll';
import userRoute from './user';
import voteRoute from './vote';

export default (app, models) => {
  app.get('/', (req, res) => {
    return res.render('main');
  });

  app.get('/page/*', (req, res) => {
    return res.render('main');
  });

  authRoute(app, models);
  commentRoute(app, models);
  pollRoute(app, models);
  userRoute(app, models);
  voteRoute(app, models);

  // Route for debuggin purposes
  app.route('/poll/removeAll')
    .get((req, res) => {
      models.Poll.find((err, polls) => {
        if (err) console.error(err);

        polls.map(poll => models.Poll.remove({ _id: poll._id }).exec());
      });
      return res.send('Done deleting all polls.');
    });
};
