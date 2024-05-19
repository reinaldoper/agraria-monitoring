const { z } = require('zod');

const userSchema = z.object({
  username: z.string().min(3, "Nome de usuário deve ser maior que 3"),
  password: z.string().min(6, "Senha deve ser maior que 6"),
});


const validateUser = (req, res, next) => {
  const user = req.body;
  try {
    userSchema.parse(user);
    next();
  } catch (error) {
    res.status(400).json({ description: error.errors[0].message });
  }
};

module.exports = validateUser;