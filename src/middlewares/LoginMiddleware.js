const { validateToken } = require('../helpers/validateToken');
const { showError } = require('../helpers/errorHelper');

const loginMiddleware = async (req, res, next) => {
  try {
    console.log('Inicio de loginMiddleware');
    
    if (!req.header('Authorization')) {
      throw new Error('Por favor inicia sesión');
    }

    const token = req.header('Authorization').split(' ')[1];
    const tokenData = await validateToken(token, res);

    if (!tokenData) {
      // Si el token no es válido, puedes manejarlo aquí y enviar una respuesta
      showError(res, new Error('Token inválido'));
    } else {
      // Si el token es válido, establece la información del usuario y continúa con la siguiente middleware
      req.user = tokenData;
      console.log('Fin de loginMiddleware sin error');
      next();
    }
  } catch (error) {
    console.error('Error en loginMiddleware:', error);

    if (!res.headersSent) {
      // Solo envía una respuesta si no se ha enviado ninguna antes
      showError(res, error);
    }

    console.log('Fin de loginMiddleware con error');
    next(error);
  }
};

module.exports = { loginMiddleware };
