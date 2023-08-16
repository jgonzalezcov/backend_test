const express = require('express');
const app = express();
app.use(express.static('public'));
const cors = require('cors');
require('dotenv').config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb', type: 'application/json', charset: 'utf-8' }));

app.use(cors());
app.use(express.json());

app.use(require('./app'));

app.listen( process.env.PORT, () => {
  console.log('El servidor esta activo en el puerto', process.env.PORT)
});
