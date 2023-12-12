const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AccountModel = require('../models/accountModels');
const list = async (req, res) => {
  try {
    const response = await AccountModel.list();
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msj: 'Ha ocurrido un error en el servidor' });
  }
};
const signin = async (req, res) => {

  try {
    let { email, password, name } = req.body;
    password = bcrypt.hashSync(password);

    const response = await AccountModel.signin({
      email,
      password,
      name
    });
 
    res.json(response);
  } catch (e) {}
};

const getTokenBody = (client) => {
  return {
    id: client.id,
    name: client.name,
    last_name: client.last_name,
    email: client.email,
    phone: client.phone,
    address: client.address,
    img: client.img,
    password: client.password,
    condition: client.condition,
    total_starts: client.total_starts,
    num_qualification: client.num_qualification,
    role: 'client',
  };
};
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const account = await AccountModel.getByEmail(email);
    const passwordIsCorrect = bcrypt.compareSync(password, account.password);

    if (passwordIsCorrect && account) {
      const tokenPayload = getTokenBody(account);
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
      res.send(token);
    } else {
      res.status(401).json({ message: 'Email o contraseña incorrecta' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msj: 'Ha ocurrido un error en el servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await AccountModel.getById(id);
    res.json(response);

  } catch (e) {
    console.log(e);
    res.status(500).json({ msj: 'Ha ocurrido un error en el servidor' });
  }
};
module.exports = {
  list,
  signin,
  login,
  getById,
};