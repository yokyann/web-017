const express = require('express');
const app = express.Router();
const Users = require("./entities/users");
const Messages = require("./entities/messages");
const Friends = require("./entities/friends");
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(cors());

const connectToDB = require("./database");
const clientPromise = connectToDB();
let users;
let messages;
let friends;
let db;


clientPromise
  .then((client) => {
    users = new Users(client);
    messages = new Messages(client);
    friends = new Friends(client);
    db = client.db('birdy');
    users.db = db;
    messages.db = db;
    friends.db = db;
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
  });


const getDB = async (req, res, next) => {
  try {
    const client = await clientPromise;
    req.db = client.db('birdy');
    next();
  } catch (error) {
    console.error("Error connecting to database: ", error);
    res.status(500).send("Error connecting to database");
  }
}
app.use(getDB)

app.use(express.json());

// simple logger for this router's requests
// all requests to this router will first hit this middleware
app.use((req, res, next) => {
  console.log("API: method %s, path %s", req.method, req.path);
  console.log("Body", req.body);
  next();
});



// Create new user
app.post("/user/new", async (req, res) => {
  const { lastName, firstName, login, password } = req.body;
  try {
    await users.create(
      lastName,
      firstName,
      login,
      password,
    )
    .then((result) => {
      console.log("result SIGNING", result)
      const token = jwt.sign({myuser : result}, 'key');
      res.status(200).send( token);
    })
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login an existing user
app.post('/user/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    await users.login(login, password)
    .then((result) => {
      console.log("user FROM API", result)
      // const token = jwt.sign({ id: user._id, firstName: user.firstName, lastName: user.lastName, login: user.login, followers : user.followers, followings: user.followings, blocked_users : blocked_users }, 'key');
      const token = jwt.sign({myuser : result}, 'key');
      res.status(200).send( token);
    })
    .catch(err => console.log("Ya une erreur dans le router.post ", err))
  } catch (error) {
    res.status(401).send("Incorrect login or password");
  }
});



// Logout current user
app.post("/user/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session: ", err);
      res.status(500).send("Error destroying session");
    } else {
      res.send("Logged out successfully");
    }
  });
});


// get all messages

app.get("/messages", async (req, res) => {

  const result = await messages.getAllMessages()
  .then((result) => {
    if (result) {
      console.log("result", result)
      res.send(result)
    } else {
      res.send('erreur lors de getAllMessages')
    }
  })
    .catch(err => console.log("Ya une erreur dans le router.get ", err))
})

// delete a user
app.delete("/user/delete", async (req, res) => {
  const { login } = req.body;
  const result = await users.deleteUser(login)
  .then((result) => {
    if (result) {
      console.log("result", result)
      res.send(result)
    } else {
      res.send('erreur lors de deleteUser')
    }
  })
});

// get a user's all messages
app.get("/messages/user", async (req, res) => {
  const { login } = req.query;
  const result = await messages.getUserMessages(login)
  .then((result) => {
    if (result) {
      console.log("result", result)
      res.send(result)
    } else {
      res.send('erreur lors de getUserMessages')
    }
  })
});


// addlike
// app.patch("/messages/addlike", async (req, res) => {

// update user login
// app.patch("/user/update/login", async (req, res) => {

// update user password
// app.patch("/user/update/password", async (req, res) => {


// delete user message
// app.delete("/user/message/delete", async (req, res) => {

// update user message
// app.update("/user/message/update", async (req, res) => {

// addcomment
// app.update("/messages/addcomment", async (req, res) => {

// delete a like
// app.delete("/messages/deletelike", async (req, res) => {

// delete a comment
// app.delete("/messages/deletecomment", async (req, res) => {

module.exports = app;
