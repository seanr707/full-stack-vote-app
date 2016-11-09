'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utility = require('./utility');

exports.default = function (app, models) {
  app.route('/poll/id/:pollId').get(function (req, res) {
    var id = { _id: req.params.pollId };

    return models.Poll.findById(id, (0, _utility.callback)(res));
  }).put(_utility.jsonParser, function (req, res) {
    var id = { _id: req.params.pollId };
    console.log(req.body.update);
    var update = Object.assign({}, req.body.update, {
      dateUpdated: Date.now(),
      options: req.body.update.options.map(function (option) {
        if (!option._id) {
          return new models.PollOption({
            title: option.title,
            votes: 0
          });
        }

        return option;
      })
    });

    console.log(update);

    return models.Poll.findOneAndUpdate(id, update, { new: true }, (0, _utility.callback)(res));
  }).delete(function (req, res) {
    var id = { _id: req.params.pollId };
    return models.Poll.remove(id, (0, _utility.callback)(res));
  });

  app.route('/polls').get(function (req, res) {
    console.log('requesting all polls...');

    return models.Poll.find(function (err, polls) {
      if (err) console.error(err);

      return res.send(polls.reverse());
    });
  }).post(_utility.jsonParser, function (req, res) {
    var input = req.body;

    console.log(input.options);

    var newPoll = new models.Poll(Object.assign({}, input, {
      dateAdded: Date.now(),
      dateUpdated: Date.now(),
      options: input.options.map(function (option) {
        // Ensure that the client is not loading false votes
        return Object.assign({}, option, { votes: 0 });
      })
    }));

    newPoll.save(function (err, poll) {
      if (err) console.error(err);
      console.log(poll);
      return res.send(poll);
    });
  });
};