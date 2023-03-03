import { ParticipantsOnMessage } from './../entities/ParticipantsOnMessages';
interface CreateParticipantsOnMessageData {
  messageId: string;
  senderId: string;
  recipientId: string;
}

interface IParticipantsOnMessageRepository {
  find(
    participantsOnMessageId: string
  ): Promise<ParticipantsOnMessage | undefined>;
  findAll(): Promise<ParticipantsOnMessage[]>;
  create(
    participantsOnMessageData: CreateParticipantsOnMessageData
  ): Promise<void>;
  update(
    participantsOnMessageId: string,
    participantsOnMessageData: CreateParticipantsOnMessageData
  ): Promise<void>;
  delete(participantsOnMessageId: string): Promise<void>;
}

export { IParticipantsOnMessageRepository, CreateParticipantsOnMessageData };
