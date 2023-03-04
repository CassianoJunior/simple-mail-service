import { PrismaMessageRepository } from '../repositories/implementations/prisma/PrismaMessageRepository';
import { PrismaParticipantsOnMessageRepository } from '../repositories/implementations/prisma/PrismaParticipantsOnMessageRepository';
import { MessageService } from '../services/MessageService';

const generateMessageInstance = () => {
  const messageRepository = new PrismaMessageRepository();
  const participantsOnMessage = new PrismaParticipantsOnMessageRepository();

  const messageService = new MessageService(
    messageRepository,
    participantsOnMessage
  );

  return messageService;
};

export { generateMessageInstance };
