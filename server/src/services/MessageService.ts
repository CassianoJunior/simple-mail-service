import { Message } from '../entities/Message';
import { ParticipantsOnMessage } from '../entities/ParticipantsOnMessages';
import { Either, left, right } from '../errors/either';
import {
  CreateMessageData,
  IMessageRepository,
  UpdateMessageData,
} from '../repositories/IMessageRepository';
import {
  CreateParticipantsOnMessageDataFromMessage,
  IParticipantsOnMessageRepository,
} from '../repositories/IParticipantsOnMessageRepository';

class MessageService {
  constructor(
    private messageRepository: IMessageRepository,
    private participantsOnMessageRepository: IParticipantsOnMessageRepository
  ) {}

  async find(id: string): Promise<Either<Error, Message>> {
    const message = await this.messageRepository.find(id);

    if (!message) return left(new Error('Message not found'));

    return right(message);
  }

  async create(
    data: CreateMessageData,
    participantsData: CreateParticipantsOnMessageDataFromMessage
  ): Promise<Either<Error, ParticipantsOnMessage>> {
    const message = await this.messageRepository.create(data, participantsData);

    const participantsOnMessage =
      await this.participantsOnMessageRepository.create({
        messageId: message.id,
        senderId: participantsData.senderId,
        recipientId: participantsData.recipientId,
        isDeleted: false,
        isRead: false,
      });

    return right(participantsOnMessage);
  }

  async update(
    id: string,
    data: UpdateMessageData
  ): Promise<Either<Error, void>> {
    const participantsOnMessage =
      await this.participantsOnMessageRepository.find(id);

    if (!participantsOnMessage) return left(new Error('Message not found'));

    return right(
      await this.messageRepository.update(participantsOnMessage.messageId, data)
    );
  }

  async delete(id: string): Promise<Either<Error, void>> {
    const participantsOnMessage =
      await this.participantsOnMessageRepository.find(id);

    if (!participantsOnMessage) return left(new Error('Message not found'));

    return right(await this.participantsOnMessageRepository.delete(id));
  }
}

export { MessageService };
