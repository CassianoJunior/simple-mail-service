import { PrismaUserRepository } from '../repositories/implementations/prisma/PrismaUserRepository';
import { UserService } from '../services/UserService';

const generateUserInstance = () => {
  const userRepository = new PrismaUserRepository();

  const userService = new UserService(userRepository);

  return userService;
};

export { generateUserInstance };
