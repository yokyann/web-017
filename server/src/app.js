const express = require('express');
const router = express.Router();
const Users = require("./entities/users");
const { resolvePath } = require("react-router-dom");
const jwt = require("jsonwebtoken");

const connectToDB = require("./database");
const clientPromise = connectToDB();
let users;

clientPromise
  .then((client) => {
    users = new Users(client);
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
  });

router.use(express.json());
// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use((req, res, next) => {
  console.log("API: method %s, path %s", req.method, req.path);
  console.log("Body", req.body);
  next();
});

router.post("/user/new", async function (req, res) {
  console.log(
    "dans router.post : ",
    req.body.lastName,
    req.body.firstName,
    req.body.login,
    req.body.pass1
  );

  if (!users) {
    res.send("Error: connection to database not established");
    return;
  }

  const result = users.create(
    req.body.lastName,
    req.body.firstName,
    req.body.login,
    req.body.pass1
  );
  if (result) {
    res.send(result.insertedId);
  } else {
    res.send("error /user/new");
  }
});

module.exports = router;
