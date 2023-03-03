import { ParticipantsOnMessage } from '../../../entities/ParticipantsOnMessages';
import {
  CreateParticipantsOnMessageData,
  IParticipantsOnMessageRepository,
} from '../../IParticipantsOnMessageRepository';

class ParticipantsOnMessageRepository
  implements IParticipantsOnMessageRepository
{
  participantsOnMessages: ParticipantsOnMessage[] = [];

  async find(participantsOnMessageId: string) {
    return this.participantsOnMessages.find(
      (participantsOnMessage) =>
        participantsOnMessage.id === participantsOnMessageId
    );
  }

  async findAll() {
    return this.participantsOnMessages;
  }

  async create(participantsOnMessageData: CreateParticipantsOnMessageData) {
    this.participantsOnMessages.push({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...participantsOnMessageData,
    });

    return;
  }

  async update(
    participantsOnMessageId: string,
    participantsOnMessageData: CreateParticipantsOnMessageData
  ) {
    this.participantsOnMessages = this.participantsOnMessages.map(
      (participantsOnMessage) => {
        if (participantsOnMessage.id === participantsOnMessageId) {
          return {
            ...participantsOnMessage,
            ...participantsOnMessageData,
            id: participantsOnMessageId,
            updatedAt: new Date(),
          };
        }

        return participantsOnMessage;
      }
    );

    return;
  }

  async delete(participantsOnMessageId: string) {
    this.participantsOnMessages = this.participantsOnMessages.filter(
      (participantsOnMessage) =>
        participantsOnMessage.id !== participantsOnMessageId
    );
  }
}

export { ParticipantsOnMessageRepository };
