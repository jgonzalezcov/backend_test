const { duplicateAccount } = require('../models/accountModels');
/**********************Valida creacion de account**********************/
const validateFields = async (req, res, next) => {

  try {

    const { email, password, name} = req.body;
    resp = parseInt(await duplicateAccount(email));
    // console.log(resp)
    if (
      email === undefined ||
      password === undefined ||
      name === undefined ||
      email === '' ||
      password === '' ||
      name === '' 
  
    ) {

      res.status(400).json({
        message:
          'No se han ingresado todos los datos para el registro de usuario',
      });
    } else if (resp > 0) {
      res.status(400).json({
        message:
          'El correo ingresado ya se encuentra asociado a una cuenta de cliente',
      });
    } else {

      next();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al crear un nuevo usuario' });
  }
};

module.exports = { validateFields };
