const express = require('express');
const router = express.Router();
const { getCountry } = require('../controllers/countryControllers'); 

router.get('/country', getCountry);

// Middleware para manejar rutas no encontradas
router.use((req, res) => {
  res.status(404).send('Esta ruta no existe');
});

module.exports = router;
