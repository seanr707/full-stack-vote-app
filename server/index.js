import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';

import routes from './routes';
import models from './models';
import oauth from './oauth';

import { COOKIE_KEY } from './keys';

const app = express();

// Constants
const DBNAME = 'fcc-voting-app';
const VIEWDIR = process.cwd() + '/public/views';

app.set('port', (process.env.PORT || 5050));

app.set('view engine', 'ejs');
app.set('views', VIEWDIR);
app.use('/public', express.static('./public'));

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
  routes(app, modelsObj);
});

app.listen(app.get('port'), function () {
  console.log('Node.js listening on port ' + app.get('port') + '...');
});
