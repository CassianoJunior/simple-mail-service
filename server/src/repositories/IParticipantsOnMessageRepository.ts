import { ParticipantsOnMessage } from './../entities/ParticipantsOnMessages';
interface CreateParticipantsOnMessageData {
  messageId: string;
  senderId: string;
  recipientId: string;
  isRead: boolean;
  senderDeleted: boolean;
  recipientDeleted: boolean;
}

interface CreateParticipantsOnMessageDataFromMessage {
  senderId: string;
  recipientId: string;
}

interface UpdateParticipantsOnMessageData {
  messageId?: string;
  senderId?: string;
  recipientId?: string;
  isRead?: boolean;
  senderDeleted?: boolean;
  recipientDeleted?: boolean;
  updatedAt?: Date;
}

interface IParticipantsOnMessageRepository {
  find(
    participantsOnMessageId: string
  ): Promise<ParticipantsOnMessage | undefined>;
  findAll(): Promise<ParticipantsOnMessage[]>;
  create(
    participantsOnMessageData: CreateParticipantsOnMessageData
  ): Promise<ParticipantsOnMessage>;
  update(
    participantsOnMessageId: string,
    participantsOnMessageData: UpdateParticipantsOnMessageData
  ): Promise<void>;
  delete(participantsOnMessageId: string): Promise<void>;
}

export {
  IParticipantsOnMessageRepository,
  CreateParticipantsOnMessageData,
  CreateParticipantsOnMessageDataFromMessage,
  UpdateParticipantsOnMessageData,
};
