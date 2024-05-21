const { z } = require('zod');

const parameterSchema = z.object({
  name: z.string().min(1, 'O nome do parâmetro é obrigatório'),
  description: z.string().optional(),
});

const commandSchema = z.object({
  deviceId: z.number().int().positive().min(1, 'O deviceId é obrigatório'),
  command: z.object({
    operation: z.string().min(1, 'A operação é obrigatória'),
    description: z.string().min(1, 'A descrição é obrigatória'),
    command: z.string().min(1, 'O comando é obrigatório'),
    result: z.string().optional(),  
    format: z.string().min(1, 'O formato é obrigatório'),
    parameters: z.array(parameterSchema).optional(),  
  }),
});

const validateCommands = (req, res, next) => {
  try {
    commandSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ description: `Erro ao validar comandos: ${err.errors[0].message}` });
  }
};

module.exports = validateCommands;
