import { callback, jsonParser } from './utility';

export default (app, models) => {
  app.route('/poll/id/:pollId/comments')
    .post(jsonParser, (req, res) => {
      const id = { _id: req.params.pollId };

      models.Poll.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: Object.assign({}, req.body.comment, {
              // Votes added here so client cannot buffer initial votes
              votes: {
                up: 0,
                down: 0
              }
            })
          }
        },
        { new: true },
        callback(res)
      );
    });

  app.route('/poll/id/:pollId/comments/:commentId')
  .put(jsonParser, (req, res) => {
    const id = {
      _id: req.params.pollId,
      'comments._id': req.params.commentId
    };

    models.Poll.findOneAndUpdate(
      id,
      {
        $set: {
          'comments.$.text': req.body.update.text,
          'comments.$.dateUpdated': Date.now()
        }
      },
      { new: true },
      callback(res)
    );
  })
  .delete((req, res) => {
    const id = { _id: req.params.pollId };

    models.Poll.findByIdAndUpdate(
      id,
      {
        $pull: {
          comments: {
            _id: req.params.commentId
          }
        }
      },
      { new: true },
      callback(res)
    );
  });
};
