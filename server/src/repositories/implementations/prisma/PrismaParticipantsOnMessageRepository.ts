import { prisma } from '../../../utils/prisma';
import {
  CreateParticipantsOnMessageData,
  IParticipantsOnMessageRepository,
} from '../../IParticipantsOnMessageRepository';

class ParticipantsOnMessageRepository
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
    await prisma.participantsOnMessage.create({
      data: {
        ...participantsOnMessageData,
      },
    });

    return;
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
    await prisma.participantsOnMessage.delete({
      where: {
        id: participantsOnMessageId,
      },
    });

    return;
  }
}

export { ParticipantsOnMessageRepository };
