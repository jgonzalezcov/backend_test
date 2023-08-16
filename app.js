const express = require('express');
const app = express();

app.use(require('./src/routes/countryRouters'));

module.exports = app;
