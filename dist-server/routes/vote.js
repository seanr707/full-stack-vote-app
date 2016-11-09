'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utility = require('./utility');

var verifiedPoll = function verifiedPoll(res, models, userId, poll, nextOptionId) {
  return function (err, user) {
    if (err) return err;

    console.log('User is logged in to vote!');
    var pollVoted = user.pollsVoted.find(function (item) {
      return item.pollId.toString() === poll._id.toString();
    });

    var userUpdate = void 0;
    var pollUpdate = void 0;

    if (pollVoted && pollVoted.optionId.toString() === nextOptionId.toString()) {
      userUpdate = user.pollsVoted.filter(function (item) {
        return item.optionId.toString() !== nextOptionId.toString();
      });

      pollUpdate = poll.options.map(function (option) {
        if (nextOptionId.toString() === option._id.toString()) {
          console.log('Removing user\'s vote from poll...');
          option.votes -= 1;
        }

        return option;
      });
    } else if (pollVoted) {
      console.log('User has already voted, changing votes!');
      pollUpdate = poll.options.map(function (option) {
        if (pollVoted.optionId.toString() === option._id.toString()) {
          console.log('Taking away old vote...');
          option.votes -= 1;
        } else if (nextOptionId.toString() === option._id.toString()) {
          console.log('Here is ' + option.votes + ' + 1: ' + (option.votes + 1));
          option.votes += 1;
        }

        return option;
      });

      userUpdate = user.pollsVoted.map(function (item) {
        if (item.pollId.toString() === poll._id.toString()) {
          item.optionId = nextOptionId;
        }

        return item;
      });
    } else {
      console.log('User has NOT voted, adding vote!');
      pollUpdate = poll.options.map(function (option) {
        if (nextOptionId.toString() === option._id.toString()) {
          console.log('Here is ' + option.votes + ' + 1: ' + (option.votes + 1));
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
    models.Poll.findByIdAndUpdate(poll._id, { options: pollUpdate }, { new: true }, (0, _utility.callback)(res));
  };
};

exports.default = function (app, models) {
  app.route('/poll/id/:pollId/vote').post(_utility.jsonParser, function (req, res) {
    var id = { _id: req.params.pollId };

    console.log(req.body.update);
    models.Poll.findById(id, function (err, poll) {
      if (err) return err;

      // Currently not allowing verified polls to add new options
      var update = poll.options.concat({
        title: req.body.update,
        votes: 1
      });

      models.Poll.findOneAndUpdate(id, { options: update }, { new: true }, (0, _utility.callback)(res));
    });
  });

  app.route('/poll/id/:pollId/vote/:voteId').get(function (req, res) {
    var id = { _id: req.params.pollId };

    return models.Poll.findOne(id, function (err, poll) {
      if (err) return console.error(err);
      return res.send(poll.options.find(function (option) {
        return option._id === req.params.voteId;
      }));
    });
  }).put(function (req, res) {
    var id = { _id: req.params.pollId };
    var userId = void 0;

    // If user is signed in then set userId to their ID from cookie
    if (req.session.passport) {
      userId = { twitterId: req.session.passport.user.profile.id };
    }

    models.Poll.findById(id, function (err, poll) {
      if (err) return err;

      if (userId && poll.authRequired) {
        models.User.findOne(userId, verifiedPoll(res, models, userId, poll, req.params.voteId));
      } else if (!userId && poll.authRequired) {
        res.send(new Error('User needs to be logged in to vote'));
      } else {
        var update = poll.options.map(function (option) {
          if (req.params.voteId === option._id.toString()) {
            console.log('Here is ' + option.votes + ' + 1: ' + (option.votes + 1));
            option.votes += 1;
          }

          return option;
        });

        models.Poll.findOneAndUpdate(id, { options: update }, { new: true }, (0, _utility.callback)(res));
      }
    });
  });
};