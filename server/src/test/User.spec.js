import { describe, expect, it } from 'vitest';
import User from '../entities/User';

const { generateInstance } = require('../factories/UserFactory');
const service = generateInstance();

describe('UserFactory', async () => {
  it('should find a existing user', async () => {
    const id = 'asd1asd';

    const user = await service.find(id);

    expect(user).toEqual({ id, name: 'John Doe', email: 'johndoe@mail.com' });
  });

  it('should create a new user', async () => {
    const userData = {
      name: 'Cassiano',
      email: 'cassiano@mail.com',
    };

    const userToAdd = new User(userData);

    const id = await service.create(userToAdd);

    const user = await service.find(id);

    expect(user).toEqual(userToAdd);

    await service.delete(id);
  });

  it('should update a existing user', async () => {
    const userData = {
      name: 'Cassiano',
      email: 'cassiano@mail.com',
    };

    const userToAdd = new User(userData);

    const id = await service.create(userToAdd);

    const user = await service.find(id);

    expect(user).toEqual(userToAdd);

    const userToUpdate = {
      name: 'Cassiano Junior',
      email: 'cassianojr@mail.com',
    };

    await service.update(id, userToUpdate);

    const updatedUser = await service.find(id);

    expect(updatedUser).toEqual({ id, ...userToUpdate });

    await service.delete(id);
  });

  it('should delete a existing user', async () => {
    const userData = {
      name: 'Cassiano',
      email: 'cassiano@mail.com',
    };

    const userToAdd = new User(userData);

    const id = await service.create(userToAdd);

    const user = await service.find(id);

    expect(user).toEqual(userToAdd);

    await service.delete(id);

    const deletedUser = await service.find(id);

    expect(deletedUser).toEqual({ error: 'User not found!' });
  });

  it('should return an error when trying to find a non existing user', async () => {
    const id = 'undefined';

    const user = await service.find(id);

    expect(user).toEqual({ error: 'User not found!' });
  });

  it('should return an error when trying to update a non existing user', async () => {
    const id = 'undefined';

    const user = await service.update(id, { name: 'Cassiano' });

    expect(user).toEqual({ error: 'User not found!' });
  });

  it('should return an error when trying to delete a non existing user', async () => {
    const id = 'undefined';

    const user = await service.delete(id);

    expect(user).toEqual({ error: 'User not found!' });
  });

  it('should return all users', async () => {
    const users = await service.find();

    expect(users).toEqual([
      { id: 'asd1asd', name: 'John Doe', email: 'johndoe@mail.com' },
      { id: 'asd2asd', name: 'Jane Doe', email: 'janedoe@mail.com' },
    ]);
  });

  it('should return an error when trying to create a user with an existing email', async () => {
    const userData = {
      name: 'Cassiano',
      email: 'cassiano@mail.com',
    };

    const userToAdd = new User(userData);
    const id = await service.create(userToAdd);
    const user = await service.find(id);

    expect(user).toEqual(userToAdd);

    const userWithSameEmail = {
      name: 'Cassiano Junior',
      email: 'cassiano@mail.com',
    };

    const userToAddWithSameEmail = new User(userWithSameEmail);
    const error = await service.create(userToAddWithSameEmail);
    expect(error).toEqual({ error: 'Email already exists!' });

    await service.delete(id);
    const deletedUser = await service.find(id);

    expect(deletedUser).toEqual({ error: 'User not found!' });
  });

  it('should return an error when trying to update a user with an existing email', async () => {
    const userData = {
      name: 'Cassiano',
      email: 'cassiano@mail.com',
    };

    const userToAdd = new User(userData);
    const id = await service.create(userToAdd);
    const user = await service.find(id);

    expect(user).toEqual(userToAdd);

    const userWithExistingEmail = {
      name: 'Cassiano Junior',
      email: 'johndoe@mail.com',
    };

    const error = await service.update(id, userWithExistingEmail);
    expect(error).toEqual({ error: 'Email already exists!' });

    await service.delete(id);
    const deletedUser = await service.find(id);

    expect(deletedUser).toEqual({ error: 'User not found!' });
  });
});
