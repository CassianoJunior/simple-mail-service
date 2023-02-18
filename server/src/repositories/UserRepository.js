const { readFile, writeFile } = require('fs/promises');

class UserRepository {
  constructor({ file }) {
    this.file = file;
  }

  async _currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  async find(userId) {
    const users = await this._currentFileContent();

    if (!userId) return users;

    const user = users.find(({ id }) => userId === id);

    if (!user) return { error: 'User not found!' };

    return user;
  }

  async create(userData) {
    const currentUsers = await this._currentFileContent();

    const userWithSameEmail = currentUsers.find(
      ({ email }) => email === userData.email
    );

    if (userWithSameEmail) return { error: 'Email already exists!' };

    currentUsers.push(userData);

    await writeFile(this.file, JSON.stringify(currentUsers));

    return userData.id;
  }

  async update(userId, userData) {
    const users = await this._currentFileContent();

    if (!users.find(({ id }) => id === userId))
      return { error: 'User not found!' };

    const userWithSameEmail = users.find(
      ({ email }) => email === userData.email
    );

    if (userWithSameEmail && userWithSameEmail.id !== userId)
      return { error: 'Email already exists!' };

    const updatedUsers = users.map((user) => {
      if (user.id === userId)
        return {
          ...userData,
          id: userId,
        };

      return user;
    });

    await writeFile(this.file, JSON.stringify(updatedUsers));
  }

  async delete(userId) {
    const users = await this._currentFileContent();

    if (!users.find(({ id }) => id === userId))
      return { error: 'User not found!' };

    const updatedUsers = users.filter(({ id }) => id !== userId);

    await writeFile(this.file, JSON.stringify(updatedUsers));
  }
}

module.exports = UserRepository;
