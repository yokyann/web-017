const express = require('express');
const app = express.Router();
const Users = require("./entities/users");
const cors = require('cors');
app.use(cors());

const connectToDB = require("./database");
const clientPromise = connectToDB();
let users;
let db;

clientPromise
  .then((client) => {
    users = new Users(client);
    db = client.db('birdy');
    users.db = db; // assign db to users.db property
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

app.post("/user/login", async (req, res) => {
  if (!users) {
    res.send("Error: connection to database not established");
    return;
  }
  
  const { login, password } = req.body;
  
  const user = await users.login(login, password, res); 
  if (!user) {
    return; // terminate the function early if the login failed
  }

  // If we reach this point, the user is authenticated
  res.send(user);
});



module.exports = app;
