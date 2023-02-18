import { describe, expect, it } from 'vitest';
const Message = require('../entities/Message');

const { generateInstance } = require('../factories/MessageFactory');

const service = generateInstance();

describe('MessageFactory', async () => {
  it('should find a existing message', async () => {
    const id = 'asd123';

    const message = await service.find(id);

    expect(message).toEqual({
      id: 'asd123',
      senderID: 'sender123',
      recipientID: 'recipient123',
      subject: 'First message',
      message: 'Hello, how are you?',
    });
  });

  it('should create a new message', async () => {
    const messageData = {
      senderID: 'sender1',
      recipientID: 'recipient1',
      subject: 'First message',
      message: 'Hello, how are you?',
    };
    const messageToAdd = new Message(messageData);

    const id = await service.create(messageToAdd);

    const message = await service.find(id);

    expect(message).toEqual({ id, ...messageToAdd });

    await service.delete(id);
  });

  it('should update a existing message', async () => {
    const messageData = {
      senderID: 'sender1',
      recipientID: 'recipient1',
      subject: 'First message',
      message: 'Hello, how are you?',
    };

    const messageToAdd = new Message(messageData);

    const id = await service.create(messageToAdd);

    const message = await service.find(id);

    expect(message).toEqual(messageToAdd);

    const messageDataToUpdate = {
      senderID: 'sender1',
      recipientID: 'recipient1',
      subject: 'First message',
      message: 'Hello, how are you? Modified',
    };

    await service.update(id, messageDataToUpdate);

    const updatedMessage = await service.find(id);

    expect(updatedMessage).toEqual({ id, ...messageDataToUpdate });

    await service.delete(id);
  });

  it('should delete a existing message', async () => {
    const messageData = {
      senderID: 'sender1',
      recipientID: 'recipient1',
      subject: 'First message',
      message: 'Hello, how are you?',
    };

    const messageToAdd = new Message(messageData);

    const id = await service.create(messageToAdd);

    const message = await service.find(id);

    expect(message).toEqual({ id, ...messageToAdd });

    await service.delete(id);

    const deletedmessage = await service.find(id);

    expect(deletedmessage).toEqual({ error: 'Message not found!' });
  });

  it('should return an error when trying to find a non existing message', async () => {
    const id = 'undefined';

    const message = await service.find(id);

    expect(message).toEqual({ error: 'Message not found!' });
  });

  it('should return an error when trying to update a non existing message', async () => {
    const messageToUpdate = {
      senderID: 'sender1',
      recipientID: 'recipient1',
      subject: 'First message',
      message: 'Hello, how are you? Modified',
    };
    const id = 'undefined';

    const message = await service.update(id, messageToUpdate);

    expect(message).toEqual({ error: 'Message not found!' });
  });

  it('should return an error when trying to delete a non existing message', async () => {
    const id = 'undefined';

    const message = await service.delete(id);

    expect(message).toEqual({ error: 'Message not found!' });
  });

  it('should return all messages', async () => {
    const messages = await service.find();

    expect(messages).toEqual([
      {
        id: 'asd123',
        senderID: 'sender123',
        recipientID: 'recipient123',
        subject: 'First message',
        message: 'Hello, how are you?',
      },
    ]);
  });
});
