const {
    getCountryModel
  } = require("../models/countryModels");
const getCountry = async (req, res) => {
    try {
        //const query = req.query;
        const countrys = await getCountryModel();
        res.json(countrys);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error en el servidor');
    }
  };
  
  module.exports = {
    getCountry, 
  };
  