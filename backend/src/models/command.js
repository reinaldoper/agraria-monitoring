const prisma = require('../db/prismaCliente');

async function createCommand(deviceId, commandData) {
  const newCommand = await prisma.command.create({
    data: {
      operation: commandData.operation,
      description: commandData.description,
      command: commandData.command.command,
      result: commandData.result,
      format: commandData.format,
      deviceId,
      parameters: {
        create: commandData.command.parameters.map(param => ({
          name: param.name,
          description: param.description,
        })),
      },
    },
    include: {
      parameters: true,
    },
  });
  return newCommand;
}

module.exports = {
  createCommand,
};
