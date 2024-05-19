const device = require('../models/device')

exports.getDevices = async (req, res) => {
  try {
    const devices = await device.getAllDevices();
    res.status(200).json({ message: devices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting devices" });
  }
};

exports.addDevice = async (req, res) => {
  const { identifier, description, manufacturer, url, userId, commands } = req.body;
  try {
    const newDevice = await device.createDevice(identifier, description, manufacturer, url, userId, commands);
    res.status(201).json({ message: newDevice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating device"});
  }
};
