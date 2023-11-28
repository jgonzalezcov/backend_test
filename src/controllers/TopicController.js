const { response } = require('express');


const TopicModel = require('../models/TopicModel');


const list = async (req, res) => {
  try {
    res('Hola')
    // const response = await TopicModel.list();
    // res.json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msj: e });
  }
};

module.exports = {

  list,

};
