const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');

// set up middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// set up routes
app.use('/api', require('./api'));

module.exports = app;
