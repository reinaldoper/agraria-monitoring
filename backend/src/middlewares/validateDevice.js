const { z } = require('zod');

const deviceSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  description: z.string().min(1, "Description is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  url: z.string().url("Invalid URL format"),
  commands: z.array(
    z.object({
      operation: z.string().min(1, "Operation is required"),
      description: z.string().min(1, "Description is required"),
      command: z.object({
        command: z.string().min(1, "Command is required"),
        parameters: z.array(z.object({
          name: z.string().min(1, "Patameter name is required"),
          description: z.string().min(1, "Parameter description is required"),
        }))
      }),
      result: z.string().min(1, "Result is required"),
      format: z.string().min(1, "Format is required")
    })
  ).optional()
});

const validateDevice = (req, res, next) => {
  try {
    deviceSchema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ description: err.errors[0].message });
  }
};

module.exports = validateDevice;