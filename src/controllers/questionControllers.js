const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const QuestionModel = require('../models/questionModels');
const list = async (req, res) => {
  try {
    const response = await QuestionModel.list();
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msj: 'Ha ocurrido un error en el servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await QuestionModel.getById(id);

    if (response.length > 0) {
      res.json(response);  // Devolver solo la primera pregunta
    } else {
      res.status(404).json({ message: 'Pregunta no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor', error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const {topic,user_id } = req.body
    const resp = await QuestionModel.create(
      topic,user_id
    )
    resp === 'error'
      ? res.send('Error al crear el registro en la base de datos')
      : res.send('Tema de estudio creado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el tema de estudio' })
  }
}

module.exports = {
  list,
  getById,
  create,
};