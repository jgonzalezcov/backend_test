/**********************Valida creacion de topic**********************/
const validateFields = async (req, res, next) => {

  try {

    const { topic, description, category,  public, user_id} = req.body;
   

    if (
      
      topic === undefined || 
      description === undefined || 
      category === undefined ||  
      public === undefined || 
      user_id  === undefined  ||
      topic === '' || 
      description === '' || 
      category === '' ||  
      public === '' || 
      user_id  === ''
    ) {

      res.status(400).json({
        message:
          'No se han ingresado todos los datos para el registro de tema de estudio',
      });
    }  else {

      next();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tema de estudio' });
  }
};




const updateFields = async (req, res, next) => {

    try {
        const { id } = req.params;
      const {topic,user_id} = req.body;
     
      // console.log(resp)
      if (
        id === undefined ||
        topic === undefined ||
        user_id === undefined ||
        id === '' ||
        topic === '' ||
        user_id  === '' 
    
      ) {
  
        res.status(400).json({
          message:
            'No se han ingresado todos los datos para el registro de tema de estudio',
        });
      }  else {
  
        next();
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar un tema de estudio' });
    }
  };

  const validateId = async (req, res, next) => {

    try {
        const { id } = req.params;
      if (
        id === undefined ||
        id === ''
    
      ) {  
        res.status(400).json({
          message:
            'No se ha ingresado un id de tema de estudio',
        });
      }  else {
  
        next();
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al validar el id tema de estudio' });
    }
  };

  const validateIdAccount = async (req, res, next) => {

    try {
        const { account_id} = req.params;
      if (
        account_id=== undefined ||
        account_id === ''
    
      ) {  
        res.status(400).json({
          message:
            'No se ha ingresado un id de tema de estudio',
        });
      }  else {
  
        next();
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al validar el id de la cuenta' });
    }
  };
module.exports = { validateFields, updateFields, validateId, validateIdAccount };
