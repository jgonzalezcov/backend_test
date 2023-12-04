const express = require('express');
const app = express();

app.use(require('./src/routes/touristRouters'));

module.exports = app;
