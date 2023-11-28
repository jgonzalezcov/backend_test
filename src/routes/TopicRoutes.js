const express = require('express')
const router = express.Router()
const TopicController = require('../controllers/TopicController')
const { loggerMiddleware } = require('../middlewares/LoggerMiddleware')
const { loginMiddleware } = require('../middlewares/LoginMiddleware')
const { validateFields } = require('../middlewares/TopicMiddleware')
const middlewares = [loggerMiddleware, loginMiddleware]
const signinMiddleware = [...middlewares, validateFields]

/** @description Listado de todos los clientes */
router.get('/',  TopicController.list)


module.exports = router
