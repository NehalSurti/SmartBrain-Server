// prismaClient.js
const { PrismaClient } = require("@prisma/client");

// Instantiate PrismaClient
const prisma = new PrismaClient({
  log: ["query"],
});

// Export the Prisma client instance
module.exports = prisma;

