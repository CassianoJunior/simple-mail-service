import { Message } from '../../../entities/Message';
import {
  CreateMessageData,
  IMessageRepository,
} from '../../IMessageRepository';

class MessageRepository implements IMessageRepository {
  messages: Message[] = [];

  async find(id: string) {
    return this.messages.find((message) => message.id === id);
  }

  async findAll() {
    return this.messages;
  }

  async create(message: CreateMessageData): Promise<void> {
    this.messages.push({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      participants: [],
      ...message,
    });

    return;
  }

  async update(id: string, messageData: CreateMessageData) {
    this.messages = this.messages.map((message) => {
      if (message.id === id) {
        return {
          ...message,
          ...messageData,
          id,
          updatedAt: new Date(),
        };
      }

      return message;
    });

    return;
  }

  async delete(id: string) {
    this.messages = this.messages.filter((message) => message.id !== id);
  }
}

export { MessageRepository };
