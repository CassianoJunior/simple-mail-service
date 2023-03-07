import { Message } from '../entities/Message';
import { CreateParticipantsOnMessageDataFromMessage } from './IParticipantsOnMessageRepository';

interface CreateMessageData {
  body: string;
  subject: string;
}

interface UpdateMessageData {
  body?: string;
  subject?: string;
  updatedAt?: Date;
}

interface IMessageRepository {
  find(id: string): Promise<Message | undefined>;
  findAll(): Promise<Message[]>;
  create(
    message: CreateMessageData,
    participantsOnMessageData: CreateParticipantsOnMessageDataFromMessage
  ): Promise<Message>;
  update(id: string, message: UpdateMessageData): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IMessageRepository, CreateMessageData, UpdateMessageData };
