'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _oauth = require('./oauth');

var _oauth2 = _interopRequireDefault(_oauth);

var _keys = require('./keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Constants
var DBNAME = 'fcc-voting-app';
var VIEWDIR = process.cwd() + '/public/views';

app.set('port', process.env.PORT || 5050);

app.set('view engine', 'ejs');
app.set('views', VIEWDIR);
app.use('/public', _express2.default.static('./public'));

// Store sessions
app.use((0, _expressSession2.default)({
  secret: _keys.COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // 1 minute for dev
    maxAge: 60000
  }
}));

// Start passport
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

// Use native promises
_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect('mongodb://localhost:27017/' + DBNAME);

var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  var modelsObj = (0, _models2.default)();
  (0, _oauth2.default)(modelsObj);
  (0, _routes2.default)(app, modelsObj);
});

app.listen(app.get('port'), function () {
  console.log('Node.js listening on port ' + app.get('port') + '...');
});