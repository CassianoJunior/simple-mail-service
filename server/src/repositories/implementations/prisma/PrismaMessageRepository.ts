import { Message } from '@prisma/client';
import { prisma } from '../../../utils/prisma';
import { IMessageRepository } from '../../IMessageRepository';

class MessageRepository implements IMessageRepository {
  async find(messageId: string) {
    const message = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
      include: {
        participants: true,
      },
    });

    return message || undefined;
  }

  async findAll() {
    const messages = await prisma.message.findMany({
      include: {
        participants: true,
      },
    });

    return messages;
  }

  async create(messageData: Message) {
    await prisma.message.create({
      data: {
        ...messageData,
      },
    });

    return;
  }

  async update(messageId: string, messageData: Message) {
    await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        ...messageData,
      },
    });

    return;
  }

  async delete(messageId: string) {
    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });

    return;
  }
}

export { MessageRepository };
