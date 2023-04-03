const express = require("express");
const path = require('path');

const router = express.Router();

const app = express();
const port = 8000;
app.use(express.static(path.join(__dirname, 'public')))

app
  .get("/", (req, res) => {
    res.setHeader("Content-Type", "text/plain;charset=UTF-8");
    res.send("Tout va à merveille");
  })
  .get("/test1", (req, res) => {
    res.setHeader("Content-Type", "text/plain;charset=UTF-8");
    res.end("Tout marche à merveille pour cette page 1");
  })
  .get("/essai:num", (req, res) => {
    res.setHeader("Content-Type", "text/plain;charset=UTF-8");
    res.end("Tout marche à merveille pour cette page " + req.params.num);
  })
  .get("/test.html", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/test.html"));
  })
  .use(function (req, res, next) {
    res.setHeader("Content-Type", "text/plain;charset=UTF-8");
    res.status(404).send("Cette page n'existe pas.");
  });

app.listen(port, function () {
  console.log("Le serveur écoute le port " + port);
});
