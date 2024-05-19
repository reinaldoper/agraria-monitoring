const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const hashPassword = hashedPassword
  try {
    const newUser = await userModel.createUser(username, hashPassword);

    const token = jwt.sign({ id: newUser.id }, 'secretKey');

    const userCreated = {
      Id: newUser.id,
      Username: newUser.username,
    }
    res.status(201).json({ description: userCreated, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ description: 'Erro de servidor' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userLogin = await userModel.findUserByUsername(username); 
    if (!userLogin) {
      return res.status(401).json({ description: 'Nome inválido' });
    }
    const passwordMatch = await bcrypt.compare(password, userLogin.password);
    if (!passwordMatch) {
      return res.status(401).json({ description: 'Senha inválida' });
    }
    const user = {
      Id: userLogin.id,
      Username: userLogin.username,
    }
    res.status(200).json({ message: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ description: 'Erro de servidor' });
  }
};
