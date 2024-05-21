const prisma = require('../db/prismaCliente');
const { findOne } = require('./user');

async function createDevice(identifier, description, manufacturer, url, commands) {
  const device = await prisma.device.create({
    data: {
      identifier,
      description,
      manufacturer,
      url,
      commands: {
        create: commands.map(cmd => ({
          operation: cmd.operation,
          description: cmd.description,
          command: cmd.command,
          result: cmd.result,
          format: cmd.format,
          parameters: {
            create: cmd.parameters.map(param => ({
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
    }
  })
}

async function updateDevice(id, data) {
  const { identifier, description, manufacturer, url, userId, commands } = data;
  const updatedDevice = await prisma.device.update({
    where: {
      id,
    },
    data: {
      identifier,
      description,
      manufacturer,
      url,
      userId,
      commands: {
        upsert: commands.map(cmd => ({
          where: { id: cmd.id || 0 }, 
          update: {
            operation: cmd.operation,
            description: cmd.description,
            command: cmd.command,
            result: cmd.result,
            format: cmd.format,
            parameters: {
              upsert: cmd.parameters.map(param => ({
                where: { id: param.id || 0 }, 
                update: {
                  name: param.name,
                  description: param.description,
                },
                create: {
                  name: param.name,
                  description: param.description,
                }
              })),
            },
          },
          create: {
            operation: cmd.operation,
            description: cmd.description,
            command: cmd.command,
            result: cmd.result,
            format: cmd.format,
            parameters: {
              create: cmd.parameters.map(param => ({
                name: param.name,
                description: param.description,
              })),
            },
          }
        })),
      },
    },
  });

  return updatedDevice;
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
  const devices = await prisma.device.findMany({
    select: {
      identifier: true,
    },
  });
  return devices.map(device => device.identifier);
}

async function getDeviceById(id) {
  return prisma.device.findUnique({
    where: {
      id,
    },
    include: {
      commands: {
        include: {
          parameters: true,
        },
      },
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
