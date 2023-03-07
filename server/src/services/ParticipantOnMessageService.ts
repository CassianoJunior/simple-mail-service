import { IMessageRepository } from '../repositories/IMessageRepository';
import { IParticipantsOnMessageRepository } from '../repositories/IParticipantsOnMessageRepository';
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
}

export { ParticipantsOnMessageService };
