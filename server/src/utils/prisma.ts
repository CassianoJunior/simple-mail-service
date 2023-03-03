import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

const clearDatabase = async () => {
  const deleteParticipants = prisma.messageParticipant.deleteMany();
  const deleteMessages = prisma.message.deleteMany();
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([deleteParticipants, deleteMessages, deleteUsers]);
};

export { prisma, clearDatabase };
