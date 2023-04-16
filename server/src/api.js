const express = require('express');
const app = express.Router();
const Users = require("./entities/users");
const Messages = require("./entities/messages");
const Friends = require("./entities/friends");
const cors = require('cors');
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
app.post("/user/new", async function (req, res) {
  console.log(
    "dans router.post : ",
    req.body.lastName,
    req.body.firstName,
    req.body.login,
    req.body.password
  );

  if (!users) {
    res.send("Error: connection to database not established");
    return;
  }

  const result = users.create(
    req.body.lastName,
    req.body.firstName,
    req.body.login,
    req.body.password
  );
  if (result) {
    res.send(result.insertedId);
  } else {
    res.send("error /user/new");
  }

});

// Login a existing user
app.post("/user/login", async (req, res) => {
  if (!users) {
    res.send("Error: connection to database not established");
    return;
  }

  const { login, password } = req.body;

  const user = await users.login(login, password, res);
  if (!user) {
    return;
  }


  res.send(user);
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

module.exports = app;
