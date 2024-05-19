const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: "Autenticação é requerida" });
    }
    const decoded = jwt.verify(authHeader, 'secretKey');
    const user = await User.findOne(Number(decoded.id));
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "As credenciais fornecidas pelo usuário são inexistentes ou inválidas" });
  }
};

module.exports = auth;
