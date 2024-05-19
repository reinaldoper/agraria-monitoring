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

exports.deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    await device.deleteDevice(id);
    res.status(200).json({ message: "Device deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting device" });
  }
};

exports.updateDevice = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedDevice = await device.updateDevice(id, req.body);
      res.status(200).json({ message: updatedDevice });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating device" });
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
