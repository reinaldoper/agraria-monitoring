const device = require('../models/device')

exports.getDevices = async (req, res) => {
  try {
    const devices = await device.getAllDevices();
    res.status(200).json({ description: "Requisição executada com sucesso", devices: devices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ description: "Erro de servidor" });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    await device.deleteDevice(Number(id));
    res.status(200).json({ description: "Requisição realizada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ description: 'Dispositivo não encontrado' });
  }
};

exports.getDeviceByIdentify = async (req, res) => {
  try {
    const { identifier } = req.params;
    const deviceIdentifier = device.findDeviceByIdentifier(identifier);
    res.status(200).json({ description: "Requisição realizada com sucesso", message: deviceIdentifier });
  } catch (error) {
    console.error(error);
    res.status(404).json({ description: 'Dispositivo não encontrado' });
  }
};

exports.getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deviceById = await device.getDeviceById(Number(id));
    res.status(200).json({ description: "Requisição realizada com sucesso", device: deviceById });
  } catch (error) {
    console.error(error);
    res.status(404).json({ description: "Dispositivo não encontrado" });
  }
};

exports.updateDevice = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDevice = await device.updateDevice(Number(id), req.body);
    res.status(200).json({ description: "Requisição realizada com sucesso", updatedDevice });
  } catch (error) {
    console.error(error);
    res.status(404).json({ description: 'Dispositivo não encontrado' });
  }
};

exports.addDevice = async (req, res) => {
  const { identifier, description, manufacturer, url, userId, commands } = req.body;
  try {
    if (!userId) {
      const { id } = req.user;
      userId = Number(id);
      const newDevice = await device.createDevice(identifier, description, manufacturer, url, userId, commands);
      res.status(201).json({ description: "Requisição realizada com sucesso", newDevice });
    } else {
      const newDevice = await device.createDevice(identifier, description, manufacturer, url, userId, commands);
      res.status(201).json({ description: "Requisição realizada com sucesso", newDevice });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ description: "Erro de servidor" });
  }
};
