const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicControllers')
const { loggerMiddleware } = require('../middlewares/LoggerMiddleware')
const { loginMiddleware } = require('../middlewares/LoginMiddleware')
const { validateFields, updateFields, validateId, validateIdAccount  } = require('../middlewares/topicMiddleware')
const middlewares = [loggerMiddleware, loginMiddleware]
/** @description Listado de todos temas de preguntas por un id_account */
router.get('/:account_id', validateIdAccount, topicController.list)
/** @description Crear un tema de preguntas  */
router.post('/', middlewares,validateFields, topicController.create)
/** @description Modificar la información de un tema de preguntas */
router.put('/:id',  middlewares,updateFields, topicController.update)
/** @description Eliminar un tema de preguntas */
router.delete('/:id', middlewares, validateId, topicController.remove)
module.exports = router