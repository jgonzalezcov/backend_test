const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountControllers')
const { loggerMiddleware } = require('../middlewares/LoggerMiddleware')
const { loginMiddleware } = require('../middlewares/LoginMiddleware')
const { validateFields } = require('../middlewares/accountMiddleware')
const middlewares = [loggerMiddleware, loginMiddleware]
const signinMiddleware = [...middlewares, validateFields]


/** @description Listado de todos los clientes */
router.get('/', accountController.list)
/** @description Crear una cuenta para cliente  */
router.post('/signin',   loggerMiddleware, validateFields, accountController.signin)
module.exports = router
/** @description Iniciar sesión como un cliente  */
router.post('/login', loggerMiddleware, accountController.login)
/** @description Obtener información de un cliente específico a través de su id */
router.get('/:id',accountController.getById)
//router.get('/:id' ,middlewares, ()=>{console.log('Holaaaassss')}, accountController.getById)