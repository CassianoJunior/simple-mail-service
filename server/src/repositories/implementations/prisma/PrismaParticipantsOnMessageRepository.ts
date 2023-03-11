import { prisma } from '../../../utils/prisma';
import {
  CreateParticipantsOnMessageData,
  IParticipantsOnMessageRepository,
  UpdateParticipantsOnMessageData,
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
    participantsOnMessageData: UpdateParticipantsOnMessageData
  ) {
    const participantOnMessage = await prisma.participantsOnMessage.update({
      where: {
        id: participantsOnMessageId,
      },
      data: {
        ...participantsOnMessageData,
      },
    });

    const wasSenderDeleted = participantsOnMessageData.senderDeleted ?? false;
    console.log('wasSenderDeleted', wasSenderDeleted);
    if (wasSenderDeleted) {
      const otherMessages = await prisma.participantsOnMessage.findMany({
        where: {
          messageId: participantOnMessage.messageId,
          senderId: participantOnMessage.senderId,
        },
      });

      if (otherMessages.length !== 0) {
        console.log('otherMessages', otherMessages);
        await prisma.participantsOnMessage.updateMany({
          where: {
            messageId: participantOnMessage.messageId,
            senderId: participantOnMessage.senderId,
          },
          data: {
            senderDeleted: true,
          },
        });
      }
    }

    const allMessagesSent = await prisma.participantsOnMessage.findMany({
      where: {
        messageId: participantOnMessage.messageId,
        senderId: participantOnMessage.senderId,
      },
    });

    if (
      allMessagesSent.every(
        (message) => message.senderDeleted && message.recipientDeleted
      )
    ) {
      await prisma.message.delete({
        where: {
          id: participantOnMessage.messageId,
        },
      });
    }

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
