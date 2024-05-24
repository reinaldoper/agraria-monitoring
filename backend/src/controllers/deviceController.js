const device = require('../models/device')

exports.getDevices = async (req, res) => {
  try {
    const devices = await device.getAllDevices();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ description: `Erro de servidor: ${error.message}` });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await device.getDeviceById(Number(id));
    if (deleted) {
      await device.deleteDevice(Number(id));
      res.status(200).json(deleted);
    } else {
      res.status(404).json({ description: 'Dispositivo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ description: error.message });
  }
};

exports.getDeviceByIdentify = async (req, res) => {
  try {
    const { identifier } = req.params;
    const deviceIdentifier = await device.findDeviceByIdentifier(identifier);
    res.status(200).json({ description: "Requisição realizada com sucesso", message: deviceIdentifier });
  } catch (error) {
    res.status(404).json({ description: 'Dispositivo não encontrado' });
  }
};

exports.getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deviceById = await device.getDeviceById(Number(id));

    if (!deviceById) throw new Error('Dispositivo não encontrado')

    res.status(200).json(deviceById);
  } catch (error) {
    res.status(404).json({ description: error.message });
  }
};

exports.updateDevice = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await device.updateDevice(Number(id), req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ description: 'Dispositivo não encontrado' });
  }
};

exports.addDevice = async (req, res) => {
  try {
    const resultDevice = await device.createDevice(req.body);
    res.set("Location", `/device/${resultDevice.id}`)
    res.status(201).send();

  } catch (error) {
    res.status(500).json({ description: `Erro de servidor: ${error.message}` });
  }
};
