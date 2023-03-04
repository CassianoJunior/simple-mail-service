import { prisma } from '../../../utils/prisma';
import {
  CreateParticipantsOnMessageData,
  IParticipantsOnMessageRepository,
} from '../../IParticipantsOnMessageRepository';

class PrismaParticipantsOnMessageRepository
  implements IParticipantsOnMessageRepository
{
  async find(participantsOnMessageId: string) {
    const participantOnMessage = await prisma.participantsOnMessage.findUnique({
      where: {
        id: participantsOnMessageId,
      },
      include: {
        message: {
          select: {
            id: true,
          },
        },
        sender: {
          select: {
            id: true,
          },
        },
        recipient: {
          select: {
            id: true,
          },
        },
      },
    });

    return participantOnMessage || undefined;
  }

  async findAll() {
    const participantsOnMessage = await prisma.participantsOnMessage.findMany({
      include: {
        message: {
          select: {
            id: true,
          },
        },
        sender: {
          select: {
            id: true,
          },
        },
        recipient: {
          select: {
            id: true,
          },
        },
      },
    });

    return participantsOnMessage;
  }

  async create(participantsOnMessageData: CreateParticipantsOnMessageData) {
    return await prisma.participantsOnMessage.create({
      data: {
        ...participantsOnMessageData,
      },
    });
  }

  async update(
    participantsOnMessageId: string,
    participantsOnMessageData: CreateParticipantsOnMessageData
  ) {
    await prisma.participantsOnMessage.update({
      where: {
        id: participantsOnMessageId,
      },
      data: {
        ...participantsOnMessageData,
      },
    });

    return;
  }

  async delete(participantsOnMessageId: string) {
    const deletedParticipantsOnMessage =
      await prisma.participantsOnMessage.delete({
        where: {
          id: participantsOnMessageId,
        },
      });

    const existsOtherRecord = await prisma.participantsOnMessage.findFirst({
      where: {
        messageId: deletedParticipantsOnMessage.messageId,
      },
    });

    if (!existsOtherRecord)
      await prisma.message.delete({
        where: {
          id: deletedParticipantsOnMessage.messageId,
        },
      });

    return;
  }
}

export { PrismaParticipantsOnMessageRepository };
