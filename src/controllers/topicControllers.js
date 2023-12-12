const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TopicModel = require('../models/topicModels');
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