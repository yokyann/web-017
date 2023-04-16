const express = require('express');
const app = express.Router();
const Users = require("./entities/users");
const cors = require('cors');
app.use(cors());

const connectToDB = require("./database");
const clientPromise = connectToDB();
let db;

clientPromise
  .then((client) => {
    db = client.db('birdy');
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

const users = new Users(db);

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

  const result = await users.create(
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
  try {
    console.log("dans router.post : ", req.body.login, req.body.password);
    const { login, password } = req.body;
    // Erreur sur la requête HTTP
    if (!login || !password) {
      res.status(400).json({
        status: 400,
        "message": "Requête invalide : login et password nécessaires"
      });
      return;
    }
    if (! await users.exists(login)) {
      res.status(401).json({
        status: 401,
        message: "Utilisateur inconnu"
      });
      return;
    }
    let userid = await users.checkpassword(login, password);
    if (userid) {
      // Avec middleware express-session
      req.session.regenerate(function (err) {
        if (err) {
          res.status(500).json({
            status: 500,
            message: "Erreur interne"
          });
        }
        else {
          // C'est bon, nouvelle session créée
          req.session.userid = userid;
          res.status(200).json({
            status: 200,
            message: "Login et mot de passe accepté"
          });
        }
      });
      return;
    }
    // Faux login : destruction de la session et erreur
    req.session.destroy((err) => { });
    res.status(403).json({
      status: 403,
      message: "login et/ou le mot de passe invalide(s)"
    });
    return;
  }
  catch (e) {
    // Toute autre erreur
    res.status(500).json({
      status: 500,
      message: "erreur interne",
      details: (e || "Erreur inconnue").toString()
    });
  }
});

