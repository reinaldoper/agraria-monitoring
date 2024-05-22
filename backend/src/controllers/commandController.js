const { sendCommand } = require('../utils/telnetClient'); 

exports.sendCommand = async (req, res) => {
  const { url, command } = req.body;

  try {
    const response = await sendCommand(url, command);
    res.status(201).json({ description: response });
  } catch (error) {
    res.status(500).json({ description: 'Erro de servidor' });
  }
};
