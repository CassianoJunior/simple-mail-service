import { User } from '../entities/User';

interface CreateUserData {
  name: string;
  email: string;
}

interface IUserRepository {
  find(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  create(user: CreateUserData): Promise<void>;
  update(id: string, user: CreateUserData): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IUserRepository, CreateUserData };
