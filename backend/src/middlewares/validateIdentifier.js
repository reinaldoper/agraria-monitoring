const { z } = require('zod');

const idSchema = z.object({
  identifier: z.string().min(1, "Identificador incorreto")
});

const validateIdentifier = (req, res, next) => {
  try {
    const { identifier } = req.params;
    idSchema.parse({identifier: identifier});
    next();
  } catch (err) {
    res.status(400).json({ description: err.errors[0].message });
  }
};

module.exports = validateIdentifier;
