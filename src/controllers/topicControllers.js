const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TopicModel = require('../models/topicModels');
const list = async (req, res) => {
  try {
    const resp = await TopicModel.list()
    resp === 'error'
      ? res.send('Error al mostrar registros desde la base de datos')
      : res.send(resp)
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los temas de estudios' })
  }
}
const create = async (req, res) => {
  try {

    const {topic , user_id,  category,  public, description} = req.body
    const resp = await TopicModel.create( topic , user_id,  category,  public, description)
    resp === 'error'
      ? res.send('Error al crear el registro en la base de datos')
      : res.send('Tema de estudio creado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el tema de estudio' })
  }
}






const createFull = async (req, res) => {
  try {
    const { topic, user_id, description, category, public: isPublic, questions } = req.body;

    // Aquí puedes realizar las validaciones necesarias antes de llamar al modelo.

    // Asumo que tu modelo tiene un método createFull que acepta un objeto con la estructura adecuada.
    const resp = await TopicModel.createFull({ topic, user_id, description, category, public: isPublic, questions });

    resp === 'error'
      ? res.send('Error al crear el registro en la base de datos')
      : res.send('Tema de estudio creado con éxito');
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el tema de estudio' });
  }
};



const update = async (req, res) => {
  try {
    const { id } = req.params
    const { topic , user_id,  category,  public, description} = req.body
    const resp = await TopicModel.update(topic , user_id,  category,  public, description, id)
    resp === 'error'
      ? res.send('Error al actualizar el registro en la base de datos')
      : res.send('Tema de estudio actualizado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el tema de estudio' })
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await TopicModel.remove(id)
    resp === 'error'
      ? res.send('Error al eliminar el registro en la base de datos')
      : res.send('Tema de estudio eliminado con éxito')
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el tema de estudio' })
  }
}
module.exports = {
  list,
  create,
  update,
  remove,
  createFull,

};