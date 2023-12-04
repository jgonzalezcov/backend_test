const express = require('express');
const router = express.Router();
const { getTourist } = require('../controllers/touristControllers'); 

router.get('/tourist', getTourist);

// Middleware para manejar rutas no encontradas
router.use((req, res) => {
  res.status(404).send('Esta ruta no existe');
});

module.exports = router;
