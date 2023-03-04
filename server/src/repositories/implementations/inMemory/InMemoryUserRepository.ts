import crypto from 'node:crypto';
import { User } from '../../../entities/User';
import { CreateUserData, IUserRepository } from '../../IUserRepository';

class InMemoryUserRepository implements IUserRepository {
  users: User[] = [];

  async find(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async findAll() {
    return this.users;
  }

  async create(user: CreateUserData) {
    this.users.push({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      messagesReceived: [],
      messagesSent: [],
      ...user,
    });

    return;
  }

  async update(id: string, userData: CreateUserData) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...userData,
          id,
          updatedAt: new Date(),
        };
      }

      return user;
    });

    return;
  }

  async delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export { InMemoryUserRepository };
