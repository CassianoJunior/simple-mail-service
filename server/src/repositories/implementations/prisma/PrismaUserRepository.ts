import { prisma } from '../../../utils/prisma';
import { CreateUserData, IUserRepository } from '../../IUserRepository';

class PrismaUserRepository implements IUserRepository {
  async find(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        messagesReceived: {
          include: {
            message: true,
            recipient: true,
            sender: true,
          },
        },
        messagesSent: {
          include: {
            message: true,
            recipient: true,
            sender: true,
          },
        },
      },
    });

    return user || undefined;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        messagesReceived: {
          include: {
            message: true,
            recipient: true,
            sender: true,
          },
        },
        messagesSent: {
          include: {
            message: true,
            recipient: true,
            sender: true,
          },
        },
      },
    });

    return user || undefined;
  }

  async findAll() {
    return await prisma.user.findMany({
      include: {
        messagesReceived: true,
        messagesSent: true,
      },
    });
  }

  async create(userData: CreateUserData) {
    await prisma.user.create({
      data: {
        ...userData,
      },
    });
  }

  async update(userId: string, userData: CreateUserData) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...userData,
      },
    });
  }

  async delete(userId: string) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}

export { PrismaUserRepository };
