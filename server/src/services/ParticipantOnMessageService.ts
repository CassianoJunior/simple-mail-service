import { IParticipantsOnMessageRepository } from '../repositories/IParticipantsOnMessageRepository';
import { Either, left, right } from './../errors/either';

class ParticipantsOnMessageService {
  constructor(private repository: IParticipantsOnMessageRepository) {}

  async readMessage(id: string): Promise<Either<Error, void>> {
    const participantsOnMessage = await this.repository.find(id);

    if (!participantsOnMessage) return left(new Error('Message not found'));

    delete participantsOnMessage.message;
    delete participantsOnMessage.sender;
    delete participantsOnMessage.recipient;

    return right(
      await this.repository.update(id, {
        ...participantsOnMessage,
        isRead: true,
      })
    );
  }
}

export { ParticipantsOnMessageService };
