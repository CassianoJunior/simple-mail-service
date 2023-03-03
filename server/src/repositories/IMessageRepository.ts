import { Message } from '../entities/Message';

interface CreateMessageData {
  body: string;
  subject: string;
}

interface IMessageRepository {
  find(id: string): Promise<Message | undefined>;
  findAll(): Promise<Message[]>;
  create(message: CreateMessageData): Promise<void>;
  update(id: string, message: CreateMessageData): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IMessageRepository, CreateMessageData };
