const {
    getTouristModel
  } = require("../models/touristModels");
const getTourist = async (req, res) => {
    try {
        //const query = req.query;
        const tourists = await getTouristModel();
        res.json(tourists);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error en el servidor');
    }
  };
  
  module.exports = {
    getTourist, 
  };
  