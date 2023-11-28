const { response } = require('express');


const TopicModel = require('../models/TopicModel');


const list = async (req, res) => {
  try {
    // res.status(500).json({ msj: 'Ok  XDXDXDXD' });
    const response = await TopicModel.list();
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msj: 'Hola cagamos' });
  }
};

module.exports = {

  list,

};
