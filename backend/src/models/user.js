const prisma = require('../db/prismaCliente');

async function createUser(username, password) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  return user;
}

async function findOne(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

async function findUserByUsername(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
}

module.exports = {
  createUser,
  findUserByUsername,
  findOne,
};
