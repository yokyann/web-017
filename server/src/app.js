const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');

app.use(cors());


app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));


const api = require('./api');

const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const apiRouter = require('./api');
app.use('/api', apiRouter);

module.exports = app;
