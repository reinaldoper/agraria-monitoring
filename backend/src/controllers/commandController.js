const { sendCommand } = require('../utils/telnetClient'); 

exports.sendCommand = async (req, res) => {
  const { url, command, params } = req.body;

  try {
    const response = await sendCommand(url, command, params);
    res.status(201).json({ description: response });
  } catch (error) {
    res.status(500).json({ description: 'Erro de servidor' });
  }
};
