const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionControllers')

/** @description Listado de todos los clientes */
router.get('/', questionController.list)
/** @description Obtener información de un cliente específico a través de su id */
router.get('/:id',  questionController.getById)

module.exports = router