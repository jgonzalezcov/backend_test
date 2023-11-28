const { response } = require('express');


const TopicModel = require('../models/TopicModel');


const list = async (req, res) => {
  try {
    const response = await TopicModel.list();
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msj: 'Error de servidor' });
  }
};

module.exports = {

  list,

};
