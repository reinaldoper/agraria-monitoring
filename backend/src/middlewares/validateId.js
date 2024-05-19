const { z } = require('zod');

const idSchema = z.object({
  id: z.number().int().positive().min(1, "ID must be a positive integer")
});

const validateId = (req, res, next) => {
  try {
    idSchema.parse({ id: parseInt(req.params.id, 10) });
    next();
  } catch (err) {
    res.status(400).json({ error: err.errors[0].message });
  }
};

module.exports = validateId;
