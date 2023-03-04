import { User } from '../entities/User';
import { Either, left, right } from '../errors/either';
import {
  CreateUserData,
  IUserRepository,
  UpdateUserData,
} from '../repositories/IUserRepository';

class UserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async find(id: string): Promise<Either<Error, User>> {
    const user = await this.userRepository.find(id);

    if (!user) return left(new Error('User not found'));

    return right(user);
  }

  async findByEmail(email: string): Promise<Either<Error, User>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return left(new Error('User not found'));

    return right(user);
  }

  async create(data: CreateUserData): Promise<Either<Error, void>> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) return left(new Error('Email already in use'));

    return right(await this.userRepository.create(data));
  }

  async update(id: string, data: UpdateUserData): Promise<Either<Error, void>> {
    const userExists = await this.userRepository.find(id);

    if (!userExists) return left(new Error('User not found'));

    if (data.email) {
      const emailAlreadyInUse = await this.userRepository.findByEmail(
        data.email
      );
      if (emailAlreadyInUse) return left(new Error('Email already in use'));
    }

    return right(await this.userRepository.update(id, data));
  }

  async delete(id: string): Promise<Either<Error, void>> {
    const userExists = await this.userRepository.find(id);

    if (!userExists) return left(new Error('User not found'));

    return right(await this.userRepository.delete(id));
  }
}

export { UserService };
