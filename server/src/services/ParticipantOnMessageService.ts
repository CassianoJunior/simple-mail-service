import { ParticipantsOnMessage } from '../entities/ParticipantsOnMessages';
import {
  CreateMessageData,
  IMessageRepository,
} from '../repositories/IMessageRepository';
import {
  CreateParticipantsOnMessageDataFromMessage,
  IParticipantsOnMessageRepository,
} from '../repositories/IParticipantsOnMessageRepository';
import { Either, left, right } from './../errors/either';

class ParticipantsOnMessageService {
  constructor(
    private repository: IParticipantsOnMessageRepository,
    private messageRepository: IMessageRepository
  ) {}

  async readMessage(id: string): Promise<Either<Error, void>> {
    const participantsOnMessage = await this.repository.find(id);

    if (!participantsOnMessage) return left(new Error('Message not found'));

    const { sender, message, recipient, ...participantsOnMessageRest } =
      participantsOnMessage;

    return right(
      await this.repository.update(id, {
        ...participantsOnMessageRest,
        isRead: true,
      })
    );
  }

  async softDeleteMessage(
    id: string,
    who: 'sender' | 'recipient'
  ): Promise<Either<Error, void>> {
    const participantsOnMessage = await this.repository.find(id);

    if (!participantsOnMessage) return left(new Error('Message not found'));

    const { sender, message, recipient, ...participantsOnMessageRest } =
      participantsOnMessage;

    await this.repository.update(id, {
      ...participantsOnMessageRest,
      [`${who}Deleted`]: true,
    });

    const participantsOnMessageUpdated = await this.repository.find(id);

    if (
      participantsOnMessageUpdated?.senderDeleted &&
      participantsOnMessageUpdated.recipientDeleted
    ) {
      await this.messageRepository.delete(
        participantsOnMessageUpdated.messageId
      );
    }

    return right((() => {})());
  }

  async replyToMessage(
    data: CreateMessageData,
    participantsData: CreateParticipantsOnMessageDataFromMessage,
    messageId: string
  ): Promise<Either<Error, ParticipantsOnMessage[]>> {
    const messageExists = await this.repository.find(messageId);

    if (!messageExists) return left(new Error('Message not found'));

    const { sender, message, recipient } = messageExists;

    const replyMessage = await this.messageRepository.create(data);

    const resultsPromises = participantsData.recipientsIds.map(async (id) => {
      return this.repository.create({
        messageId: replyMessage.id,
        senderId: participantsData.senderId,
        recipientId: id,
        senderDeleted: false,
        recipientDeleted: false,
        isRead: false,
        replyToId: messageId,
      });
    });

    const replysParticipantsOnMessage = await Promise.all(resultsPromises);

    return right(replysParticipantsOnMessage);
  }

  async forwardMessage(
    data: CreateMessageData,
    participantsData: CreateParticipantsOnMessageDataFromMessage,
    messageId: string
  ): Promise<Either<Error, ParticipantsOnMessage[]>> {
    const messageExists = await this.repository.find(messageId);

    if (!messageExists) return left(new Error('Message not found'));

    const { sender, message, recipient } = messageExists;

    const forwardMessage = await this.messageRepository.create(data);

    const resultsPromises = participantsData.recipientsIds.map(async (id) => {
      return this.repository.create({
        messageId: forwardMessage.id,
        senderId: participantsData.senderId,
        recipientId: id,
        senderDeleted: false,
        recipientDeleted: false,
        isRead: false,
        forwardToId: messageId,
      });
    });

    const forwardParticipantsOnMessage = await Promise.all(resultsPromises);

    return right(forwardParticipantsOnMessage);
  }
}

export { ParticipantsOnMessageService };
