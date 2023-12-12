const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicControllers')

/** @description Listado de todos los clientes */
router.get('/', topicController.list)


module.exports = router