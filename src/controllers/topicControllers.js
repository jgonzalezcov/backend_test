const {
    getTopicModel
  } = require("../models/topicModels");
const getTopic = async (req, res) => {
    try {
        //const query = req.query;
        const tourists = await getTopicModel();
        res.json(tourists);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error en el servidor');
    }
  };
  
  module.exports = {
    getTopic, 
  };
  