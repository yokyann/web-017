const path = require('path');
const express = require('express');
const app = express();

const api = require('./api');

const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const cors = require('cors');
app.use(cors());

app.use('/api', api);

module.exports = app;
