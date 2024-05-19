const { sendCommand } = require('../utils/telnetClient'); 
const { createCommand } = require('../models/command');
const { findDeviceByIdentifier } = require('../models/device')

exports.sendCommand = async (req, res) => {
  const { deviceId, command } = req.body;

  try {
    const device = await findDeviceByIdentifier(deviceId);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    const response = await sendCommand(device.url, command);
    await createCommand(deviceId, command);
    res.status(201).json({ message: `Command "${command}" sent to device ${deviceId}`, response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
