const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header provided" });
    }
    const decoded = jwt.verify(authHeader, 'secretKey');
    const user = await User.findOne(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Unauthorized" });
  }
};

module.exports = auth;
