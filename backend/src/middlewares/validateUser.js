const { z } = require('zod');

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


const validateUser = (req, res, next) => {
  const user = req.body;
  try {
    userSchema.parse(user);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors[0].message });
  }
};

module.exports = validateUser;