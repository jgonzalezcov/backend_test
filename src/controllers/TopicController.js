const { response } = require('express');


const TopicModel = require('../models/TopicModel');


const list = async (req, res) => {
  try {
    const response = await TopicModel.list();
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msj: 'Ha ocurrido un error en el servidor' });
  }
};

module.exports = {

  list,

};
