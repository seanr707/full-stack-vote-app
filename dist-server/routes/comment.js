'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utility = require('./utility');

exports.default = function (app, models) {
  app.route('/poll/id/:pollId/comments').post(_utility.jsonParser, function (req, res) {
    var id = { _id: req.params.pollId };

    models.Poll.findByIdAndUpdate(id, {
      $push: {
        comments: Object.assign({}, req.body.comment, {
          // Votes added here so client cannot buffer initial votes
          votes: {
            up: 0,
            down: 0
          }
        })
      }
    }, { new: true }, (0, _utility.callback)(res));
  });

  app.route('/poll/id/:pollId/comments/:commentId').put(_utility.jsonParser, function (req, res) {
    var id = {
      _id: req.params.pollId,
      'comments._id': req.params.commentId
    };

    models.Poll.findOneAndUpdate(id, {
      $set: {
        'comments.$.text': req.body.update.text,
        'comments.$.dateUpdated': Date.now()
      }
    }, { new: true }, (0, _utility.callback)(res));
  }).delete(function (req, res) {
    var id = { _id: req.params.pollId };

    models.Poll.findByIdAndUpdate(id, {
      $pull: {
        comments: {
          _id: req.params.commentId
        }
      }
    }, { new: true }, (0, _utility.callback)(res));
  });
};