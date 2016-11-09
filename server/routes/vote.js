import { callback, jsonParser } from './utility';

const verifiedPoll = (res, models, userId, poll, nextOptionId) => {
  return (err, user) => {
    if (err) return err;

    console.log('User is logged in to vote!');
    const pollVoted = user.pollsVoted.find(item => item.pollId.toString() === poll._id.toString());

    let userUpdate;
    let pollUpdate;

    if (pollVoted && pollVoted.optionId.toString() === nextOptionId.toString()) {
      userUpdate = user.pollsVoted.filter(item => item.optionId.toString() !== nextOptionId.toString());

      pollUpdate = poll.options.map(option => {
        if (nextOptionId.toString() === option._id.toString()) {
          console.log('Removing user\'s vote from poll...');
          option.votes -= 1;
        }

        return option;
      });
    } else if (pollVoted) {
      console.log('User has already voted, changing votes!');
      pollUpdate = poll.options.map(option => {
        if (pollVoted.optionId.toString() === option._id.toString()) {
          console.log('Taking away old vote...');
          option.votes -= 1;
        } else if (nextOptionId.toString() === option._id.toString()) {
          console.log(`Here is ${option.votes} + 1: ${option.votes + 1}`);
          option.votes += 1;
        }

        return option;
      });

      userUpdate = user.pollsVoted.map(item => {
        if (item.pollId.toString() === poll._id.toString()) {
          item.optionId = nextOptionId;
        }

        return item;
      });
    } else {
      console.log('User has NOT voted, adding vote!');
      pollUpdate = poll.options.map(option => {
        if (nextOptionId.toString() === option._id.toString()) {
          console.log(`Here is ${option.votes} + 1: ${option.votes + 1}`);
          option.votes += 1;
        }

        return option;
      });

      userUpdate = user.pollsVoted.concat({
        pollId: poll._id,
        optionId: nextOptionId
      });
    }

    models.User.findOneAndUpdate(userId, { pollsVoted: userUpdate }).exec();
    models.Poll.findByIdAndUpdate(poll._id, { options: pollUpdate }, { new: true }, callback(res));
  };
};

export default (app, models) => {
  app.route('/poll/id/:pollId/vote')
    .post(jsonParser, (req, res) => {
      const id = { _id: req.params.pollId };

      console.log(req.body.update);
      models.Poll.findById(id, (err, poll) => {
        if (err) return err;

        // Currently not allowing verified polls to add new options
        const update = poll.options.concat({
          title: req.body.update,
          votes: 1
        });

        models.Poll.findOneAndUpdate(id, { options: update }, { new: true }, callback(res));
      });
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
      let userId;

      // If user is signed in then set userId to their ID from cookie
      if (req.session.passport) {
        userId = { twitterId: req.session.passport.user.profile.id };
      }

      models.Poll.findById(id, (err, poll) => {
        if (err) return err;

        if (userId && poll.authRequired) {
          models.User.findOne(userId, verifiedPoll(res, models, userId, poll, req.params.voteId));
        } else if (!userId && poll.authRequired) {
          res.send(new Error('User needs to be logged in to vote'));
        } else {
          const update = poll.options.map(option => {
            if (req.params.voteId === option._id.toString()) {
              console.log(`Here is ${option.votes} + 1: ${option.votes + 1}`);
              option.votes += 1;
            }

            return option;
          });

          models.Poll.findOneAndUpdate(id, { options: update }, { new: true }, callback(res));
        }
      });
    });
};
