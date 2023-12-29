const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicControllers')
const { loggerMiddleware } = require('../middlewares/LoggerMiddleware')
const { loginMiddleware } = require('../middlewares/LoginMiddleware')
const { validateFields, updateFields, validateId, validateIdAccount  } = require('../middlewares/topicMiddleware')
const middlewares = [loggerMiddleware, loginMiddleware]
/** @description Listado de todos temas de preguntas por un id_account */

/** @description Crear un tema de preguntas  */
router.post('/', middlewares,validateFields, topicController.create)
/** @description Crear un tema de preguntas con preguntas y alternativas  */
router.post('/full',middlewares,  topicController.createFull)

/** @description Listado de todos temas con preguntas y alternativas */
router.get('/full', middlewares, topicController.list)


/** @description Modificar la información de un tema de preguntas */
router.put('/:id',  middlewares,updateFields, topicController.update)
/** @description Eliminar un tema de preguntas */
router.delete('/:id', middlewares, validateId, topicController.remove)

//router.get('/:account_id', middlewares, validateIdAccount, topicController.list)
module.exports = router