const express = require('express');
const router = express.Router();
const {getTopic} = require('../controllers/topicControllers'); 

router.get('/topic', getTopic);

// Middleware para manejar rutas no encontradas
router.use((req, res) => {
  res.status(404).send('Esta ruta no existe');
});

module.exports = router;
