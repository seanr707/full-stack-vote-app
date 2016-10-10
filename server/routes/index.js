import passport from 'passport';
import { json } from 'body-parser';

const jsonParser = json();
const errorCheck = err => {
  return err ? res.send(true) : res.send(false);
};

const callback = (res) => {
  return (err, polls) => {
    return res.send(err ? false : polls);
  };
};

export default (app, models, publicPath) => {
  app.route('/')
    .get((req, res) => {
      return res.sendFile(publicPath + '/index.html');
    });

  app.route('/poll/page/:pollId')
    .get((req, res) => {
      return res.redirect(302, '/');
    });

  app.route('/poll/id/:pollId')
    .get((req, res) => {
      const id = { _id: req.params.pollId };

      return models.Poll.findById(id, callback(res));
    })
    .put(jsonParser, (req, res) => {
      const id = { _id: req.params.pollId };

      return models.Poll.findOneAndUpdate(id, req.body.update, { new: true }, callback(res));
    })
    .delete((req, res) => {
      const id = { _id: req.params.pollId };
      return models.Poll.remove(id, callback(res));
    });

  app.route('/poll/id/:pollId/vote/:voteId')
    .get((req, res) => {
      const id = { _id: req.params.pollId };

      return models.Poll.findOne(id, (err, poll) => {
        if (err) return console.error(err);
        return res.send(
          poll.options.find(option => option._id === req.params.voteId)
        );
      });
    })
    .put((req, res) => {
      const id = { _id: req.params.pollId };

      models.Poll.findOne(id, (err, poll) => {
        if (err) console.error(err);

        const update = poll.options.map(option => {
          if (req.params.voteId === option._id.toString()) {
            console.log(`Here is ${option.votes} + 1: ${option.votes + 1}`);
            option.votes += 1;
          }

          return option;
        });

        models.Poll.findOneAndUpdate(id, { options: update }, { new: true }, callback(res));
      });
    });

  app.route('/poll/id/:pollId/comments')
    .post(jsonParser, (req, res) => {
      const id = { _id: req.params.pollId };
      console.log(req.body.comment);
      models.Poll.findByIdAndUpdate(
        id,
        { $push: { comments: req.body.comment } },
        { new: true },
        callback(res)
      );
    });

  app.route('/poll/all')
    .get((req, res) => {
      console.log('requesting all polls...');

      return models.Poll.find((err, polls) => {
        if (err) console.error(err);

        return res.send(polls);
      });
    });

  app.route('/poll/add')
    .post(jsonParser, (req, res) => {
      const input = req.body;

      console.log(input.options);

      const newPoll = new models.Poll({
        title: input.title,
        desc: input.desc,
        author: input.author,
        options: input.options
      });

      newPoll.save((err, poll) => {
        if (err) console.error(err);
        console.log(poll);
        return res.send(poll);
      });
    });

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
      return models.User.findOne(id, (err, user) => {
        if (err) {
          console.error(err);
          return res.send(false);
        }

        return res.send(user);
      });
    });

  app.route('/user/all')
    .get((req, res) => {
      console.log('Users');
    });

  app.route('/poll/removeAll')
    .get((req, res) => {
      models.Poll.find((err, polls) => {
        console.log(polls);
        // Maybe working after edit?
        polls.map(poll => models.Poll.remove({ _id: poll._id }).exec());
      });
      return res.send('Done deleting all polls.');
    });
};
