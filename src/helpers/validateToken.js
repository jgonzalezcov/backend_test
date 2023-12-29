const jwt = require('jsonwebtoken');
const util = require('util');
const { showError } = require('../helpers/errorHelper');

const verifyAsync = util.promisify(jwt.verify);

const validateToken = async (token, res) => {
  try {
    const validate = await verifyAsync(token, process.env.JWT_SECRET);
    return validate;
  } catch (e) {
console.log('Token no valido') // Propagar el error para que pueda ser capturado por el código que llama a validateToken
  }
};

module.exports = { validateToken };
