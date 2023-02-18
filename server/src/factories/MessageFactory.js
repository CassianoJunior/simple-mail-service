const MessageRepository = require('../repositories/MessageRepository');
const MessageService = require('../services/MessageService');

const { join } = require('path');

const filename = join(__dirname, '../../database', 'messagesDatabase.json');

const generateInstance = () => {
  const messagesRepository = new MessageRepository({
    file: filename,
  });

  const messageService = new MessageService({
    messagesRepository,
  });

  return messageService;
};

module.exports = { generateInstance };
