const { z } = require('zod');

const parameterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  commandId: z.number().int().positive().optional(),
});

const commandSchema = z.object({
  operation: z.string().min(1, "Operation is required"),
  description: z.string().min(1, "Description is required"),
  command: z.string().min(1, "Command is required"),
  result: z.string().min(1, "Result is required"),
  format: z.string().min(1, "Format is required"),
  parameters: z.array(parameterSchema).optional(),
});

const deviceSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  description: z.string().min(1, "Description is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  url: z.string().url("Invalid URL format"),
  commands: z.array(commandSchema).optional(),
});

const validateDevice = (req, res, next) => {
  try {
    deviceSchema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({
      description: "A solicitação não foi realizada pelo proprietário do dispositivo",
      errors: err.errors[0].message,
    });
  }
};

module.exports = validateDevice;
