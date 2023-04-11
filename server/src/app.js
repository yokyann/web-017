const path = require("path");
const apiUser = require("./api/apiUser.js");
const apiTweet = require("./api/apiTweet.js");
const Datastore = require('nedb');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const express = require('express');
const app = express();

// Session
const session = require('express-session');
app.use(session({
    secret: "technoweb rocks",
    resave: true,
    saveUninitialized: true
}));

let db = {};
db.users = new Datastore(`${basedir}/database/users.db`);
db.tweets = new Datastore(`${basedir}/database/tweets.db`);
db.users.loadDatabase();
db.tweets.loadDatabase();

app.use('/api', apiUser.default(db.users, db.tweets));
app.use('/apiTweet', apiTweet.default(db.tweets, db.users));

// Démarrage du serveur
app.on('close', () => {
    db.close();
});

exports.default = app;