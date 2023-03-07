import { PrismaMessageRepository } from '../repositories/implementations/prisma/PrismaMessageRepository';
import { PrismaParticipantsOnMessageRepository } from '../repositories/implementations/prisma/PrismaParticipantsOnMessageRepository';
import { ParticipantsOnMessageService } from '../services/ParticipantOnMessageService';

const generateParticipantInstance = () => {
  const participantsOnMessageRepository =
    new PrismaParticipantsOnMessageRepository();

  const messageRepository = new PrismaMessageRepository();
  const participantsOnMessageService = new ParticipantsOnMessageService(
    participantsOnMessageRepository,
    messageRepository
  );

  return participantsOnMessageService;
};

export { generateParticipantInstance };
