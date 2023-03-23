const express = require("express");

const router = express.Router();

const app = express();
const port = 8000;

router.use(express.json());

router
  .get("/", (req, res) => {
    res.setHeader("Content-Type", "text/plain;charset=UTF-8");
    res.send("Serveur à l'écoute");
  })
  .post("/api", (req, res) => {
    // Pour plus de lisibilité, on peut aussi définir const {name, nb1, nb2}=req.body;
    try {
      if (!req.body.name) {
        res.status(400).json({
          status: 400,
          message: "Requête invalide : name nécessaire",
        });
        return;
      }
      if (
        !(typeof req.body.nb1 == "number") ||
        !(typeof req.body.nb2 == "number")
      ) {
        res.status(400).json({
          status: 400,
          message: "Requête invalide : nb1 et nb2 doivent être des nombres",
        });
        return;
      }
      console.log(req.body.name);
      res.json({
        addition: Number(req.body.nb1) + Number(req.body.nb2),
        prop: "hello",
      });
      res.end();
    } catch (e) {
      // Toute autre erreur
      res.status(500).json({
        status: 500,
        message: "erreur interne",
        details: (e || "Erreur inconnue").toString(),
      });
    }
  })
  .use(function (req, res, next) {
    res.setHeader("Content-Type", "text/plain;charset=UTF-8");
    res.status(404).send("Cette page n'existe pas.");
  });

app.use("/", router);

app.listen(port, function () {
  console.log("Le serveur écoute le port " + port);
});
