const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

const routes = require('./server/routes');
const models = require('./server/models');
const oauth = require('./server/oauth');

const app = express();

// Constants
const DBNAME = 'fcc-voting-app';
const VIEWDIR = '/public';
const { COOKIE_KEY } = require('./server/keys');

app.set('port', (process.env.PORT || 5050));

// Store sessions
app.use(session({
  secret: COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // 1 minute for dev
    maxAge: 60000
  }
}));

// Start passport
app.use(passport.initialize());
app.use(passport.session());

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/' + DBNAME);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  const modelsObj = models();
  oauth(modelsObj);
  routes(app, modelsObj, process.cwd() + VIEWDIR);
});

app.use('/public', express.static(process.cwd() + VIEWDIR));

app.listen(app.get('port'), function () {
  console.log('Node.js listening on port ' + app.get('port') + '...');
});
