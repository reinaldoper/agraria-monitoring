const { z } = require('zod');

const commandSchema = z.object({
  command: z.string().min(1, 'O nome do comando é obrigatório'),
  params: z.array(z.string()).optional(), 
  url: z.string().url("Invalid URL format"),
});

const validateCommands = (req, res, next) => {
  try {
    commandSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ description: err.errors[0].message });
  }
};

module.exports = validateCommands;
