const { readFile, writeFile } = require('fs/promises');
const shortid = require('shortid');

class MessageRepository {
  constructor({ file }) {
    this.file = file;
  }

  async _currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  async find(messageId) {
    const messages = await this._currentFileContent();

    if (!messageId) return messages;

    const message = messages.find(({ id }) => messageId === id);

    if (!message) return { error: 'Message not found!' };

    return message;
  }

  async findByUser(userId) {
    const messages = await this._currentFileContent();

    return messages.filter(({ senderId, recipientId }) => {
      return senderId === userId || recipientId === userId;
    });
  }

  async create(messageData) {
    const currentMessages = await this._currentFileContent();

    currentMessages.push(messageData);

    await writeFile(this.file, JSON.stringify(currentMessages));

    return messageData.id;
  }

  async update(messageId, messageData) {
    const messages = await this._currentFileContent();

    if (!messages.find(({ id }) => id === messageId))
      return { error: 'Message not found!' };

    const updatedmessages = messages.map((message) => {
      if (message.id === messageId)
        return {
          ...messageData,
          id: messageId,
          updatedAt: new Date().toISOString(),
        };

      return message;
    });

    await writeFile(this.file, JSON.stringify(updatedmessages));

    return messageId;
  }

  async delete(messageId) {
    const messages = await this._currentFileContent();

    if (!messages.find(({ id }) => id === messageId))
      return { error: 'Message not found!' };

    const updatedmessages = messages.filter(({ id }) => id !== messageId);

    await writeFile(this.file, JSON.stringify(updatedmessages));
  }
}

module.exports = MessageRepository;
