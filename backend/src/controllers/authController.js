const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const hashPassword = hashedPassword
  try {
    await userModel.createUser(username, hashPassword);

    res.status(201).json({ description: 'Requisição realizada com sucesso' });
  } catch (err) {
    res.status(500).json({ description: 'Usuário inválido' });
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
    const newUser = await userModel.findUserByUsername(username);

    const token = jwt.sign({ id: newUser.id }, 'secretKey');
    const user = {
      Id: userLogin.id,
      Username: userLogin.username,
    }
    res.status(200).json({ description: 'Requisição realizada com sucesso', token: token, user: user });
  } catch (err) {
    res.status(404).json({ description: 'Usuário inválido' });
  }
};
