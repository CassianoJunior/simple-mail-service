import { IUserRepository, User } from '../repositories/IUserRepository';

class UserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async find(id: string) {
    return await this.userRepository.find(id);
  }

  async create(data: User) {
    return await this.userRepository.create(data);
  }

  async update(id: string, data: User) {
    return await this.userRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}

export { UserService };
