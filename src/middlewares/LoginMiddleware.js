const { validateToken } = require('../helpers/validateToken');
const { showError } = require('../helpers/errorHelper');

const loginMiddleware = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      throw new Error('Por favor inicia sesion');
    }

    const token = req.header('Authorization').split(' ')[1];
    const tokenData = await validateToken(token, res);

    if (!tokenData) {
      return res.status(401).send({ message: 'Token invalido' });
    }

    req.user = tokenData;
    next();
  } catch (e) {
    console.error('Error en loginMiddleware:', e);
    showError(res, e);
    return;
  }
};

module.exports = { loginMiddleware };
