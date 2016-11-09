'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _poll = require('./poll');

var _poll2 = _interopRequireDefault(_poll);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _vote = require('./vote');

var _vote2 = _interopRequireDefault(_vote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app, models) {
  app.get('/', function (req, res) {
    return res.render('main');
  });

  app.get('/page/*', function (req, res) {
    return res.render('main');
  });

  (0, _auth2.default)(app, models);
  (0, _comment2.default)(app, models);
  (0, _poll2.default)(app, models);
  (0, _user2.default)(app, models);
  (0, _vote2.default)(app, models);

  // Route for debuggin purposes
  app.route('/poll/removeAll').get(function (req, res) {
    models.Poll.find(function (err, polls) {
      if (err) console.error(err);

      polls.map(function (poll) {
        return models.Poll.remove({ _id: poll._id }).exec();
      });
    });
    return res.send('Done deleting all polls.');
  });
};