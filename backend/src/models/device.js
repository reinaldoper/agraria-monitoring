const prisma = require('../db/prismaCliente')

async function createDevice(identifier, description, manufacturer, url, userId, commands) {
  const device = await prisma.device.create({
    data: {
      identifier,
      description,
      manufacturer,
      url,
      userId,
      commands: {
        create: commands.map(cmd => ({
          operation: cmd.operation,
          description: cmd.description,
          command: cmd.command.command,
          result: cmd.result,
          format: cmd.format,
          parameters: {
            create: cmd.command.parameters.map(param => ({
              name: param.name,
              description: param.description,
            })),
          },
        })),
      },
    },
    include: {
      commands: {
        include: {
          parameters: true,
        },
      },
    },
  });
  return device;
}

async function deleteDevice(id) {
  await prisma.device.delete({
    where: {
      id,
    },
  });
}

async function updateDevice(id, data) {
  const device = await prisma.device.update({
    where: {
      id,
    },
    data,
  });
  return device;
}

async function findDeviceByIdentifier(identifier) {
  const device = await prisma.device.findUnique({
    where: {
      identifier,
    },
  });
  return device;
}

async function getAllDevices() {
  return prisma.device.findMany({
    include: {
      identifier: true,
    },
  });
}

async function getDeviceById(id) {
  return prisma.device.findUnique({
    where: {
      id,
    },
  });
}

module.exports = {
  createDevice,
  findDeviceByIdentifier,
  getAllDevices,
  deleteDevice,
  updateDevice,
  getDeviceById
};
