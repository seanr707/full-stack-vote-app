import { callback, jsonParser } from './utility';

export default (app, models) => {
  app.route('/poll/id/:pollId')
    .get((req, res) => {
      const id = { _id: req.params.pollId };

      return models.Poll.findById(id, callback(res));
    })
    .put(jsonParser, (req, res) => {
      const id = { _id: req.params.pollId };

      const update = Object.assign({}, req.body.update, {
        dateUpdated: Date.now(),
        options: req.body.update.options.map(option => {
          if (!option._id) {
            return new models.PollOption({
              title: option.title,
              votes: 0
            });
          }

          return option;
        })
      });

      return models.Poll.findOneAndUpdate(id, update, { new: true }, callback(res));
    })
    .delete((req, res) => {
      const id = { _id: req.params.pollId };
      return models.Poll.remove(id, callback(res));
    });

  app.route('/polls')
    .get((req, res) => {
      return models.Poll.find((err, polls) => {
        if (err) console.error(err);

        return res.send(polls.reverse());
      });
    })
    .post(jsonParser, (req, res) => {
      const input = req.body;

      const newPoll = new models.Poll(Object.assign({}, input, {
        dateAdded: Date.now(),
        dateUpdated: Date.now(),
        options: input.options.map(option => {
          // Ensure that the client is not loading false votes
          return Object.assign({}, option, { votes: 0 });
        })
      }));

      newPoll.save(callback(res));
    });
};
