const express = require('express');
const app = express();
const cors = require('cors');

const CsbInspector = require('csb-inspector');
CsbInspector();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/topic', require('./src/routes/topicRoutes'));
app.use('/question', require('./src/routes/questionRoutes'));
app.use('/account', require('./src/routes/accountRoutes'));

app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

module.exports = app;