const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicControllers')
const { loggerMiddleware } = require('../middlewares/LoggerMiddleware')
const { loginMiddleware } = require('../middlewares/LoginMiddleware')
const { validateFields, updateFields, validateId, validateIdAccount  } = require('../middlewares/topicMiddleware')
const middlewares = [loggerMiddleware, loginMiddleware]
/** @description Listado de todos los clientes */
router.get('/:account_id', validateIdAccount, topicController.list)
/** @description Crear un tema de preguntas  */
router.post('/', loggerMiddleware, validateFields, topicController.create)
/** @description Modificar la información de un tema de preguntas */
router.put('/:id', loggerMiddleware, updateFields, topicController.update)
/** @description Eliminar un tema de preguntas */
router.delete('/:id', loggerMiddleware, validateId, topicController.remove)
module.exports = router