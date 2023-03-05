import { PrismaParticipantsOnMessageRepository } from '../repositories/implementations/prisma/PrismaParticipantsOnMessageRepository';
import { ParticipantsOnMessageService } from '../services/ParticipantOnMessageService';

const generateParticipantInstance = () => {
  const participantsOnMessageRepository =
    new PrismaParticipantsOnMessageRepository();

  const participantsOnMessageService = new ParticipantsOnMessageService(
    participantsOnMessageRepository
  );

  return participantsOnMessageService;
};

export { generateParticipantInstance };
