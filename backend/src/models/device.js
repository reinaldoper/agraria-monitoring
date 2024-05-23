const prisma = require('../db/prismaCliente');

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
          command: {
            create: {
              command: cmd.command.command,
              parameters: {
                create: cmd.command.parameters.map(param => ({
                  name: param.name,
                  description: param.description,
                })),
              },
            }
          },
          result: cmd.result,
          format: cmd.format,
        })),
      },
    },
    include: {
      commands: {
        include: {
          command: {
            include: {
              parameters: true
            }
          }
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
  const device = await prisma.device.update({
    where: {
      id,
    },
    data: {
      identifier: data.identifier,
      description: data.description,
      manufacturer: data.manufacturer,
      url: data.url,
      commands: {
        deleteMany: {},
        create: data.commands.map(command => {
          return {
            operation: command.operation,
            description: command.description,
            command: {
              create: {
                command: command.command.command,
                parameters: {
                  create: command.command.parameters
                }
              }
            },
            result: command.result,
            format: command.format
          };
        })
      }
    },
    include: {
      commands: {
        include: {
          command: {
            include: {
              parameters: true
            }
          }
        },
      },
    },
  });
  return device;
}

async function findDeviceByIdentifier(identifier) {
  const device = await prisma.device.findUnique({
    where: {
      identifier,
    },
    include: {
      commands: {
        select: {
          operation: true,
          description: true,
          command: {
            select: {
              command: true,
              parameters: {
                select: {
                  name: true,
                  description: true
                }
              },
            },
          },
          format: true,
          result: true,
        }
      }
    }
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
        select: {
          operation: true,
          description: true,
          command: {
            select: {
              command: true,
              parameters: {
                select: {
                  name: true,
                  description: true
                }
              },
            },
          },
          format: true,
          result: true,
        }
      }
    }
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