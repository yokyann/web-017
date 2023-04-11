const port = process.env.PORT || 4000;
/* eslint-disable import/no-commonjs */
const cors = require('cors');

const express = require('express'); 
const app = express();
const session = require('express-session') // J'ai pas compris c'est quoi encore

app.use(express.json());
app.use(cors())

const router = require('./app')
app.use('/', router);

app.listen(port, () => {
  console.log(`Serveur actif sur le port ${port}`);
});

