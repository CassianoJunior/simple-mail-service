import { UserRepository } from '../repositories/implementations/PrismaUserRepository';
import { UserService } from '../services/UserService';
import { prisma } from '../utils/prisma';

const generateInstance = () => {
  const userRepository = new UserRepository(prisma);

  const userService = new UserService(userRepository);

  return userService;
};

export { generateInstance };
