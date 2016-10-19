import { callback, jsonParser } from './utility';

export default (app, models) => {
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
};
