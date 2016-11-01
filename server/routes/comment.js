import { callback, jsonParser } from './utility';

export default (app, models) => {
  app.route('/poll/id/:pollId/comments')
    .post(jsonParser, (req, res) => {
      const id = { _id: req.params.pollId };

      models.Poll.findByIdAndUpdate(
        id,
        { $push: { comments: req.body.comment } },
        { new: true },
        callback(res)
      );
    });

  app.route('/poll/id/:pollId/comments/:commentId')
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
