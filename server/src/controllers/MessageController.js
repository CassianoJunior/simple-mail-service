const { handleError, DEFAULT_HEADER } = require('../utils/index.js');
const Message = require('../entities/Message');
const { generateInstance } = require('../factories/MessageFactory');

const messageService = generateInstance();

module.exports = {
  getMessage: async (req, res) => {
    try {
      const { id } = req.queryString;
      const message = await messageService.find(id);
      res.write(JSON.stringify(message));

      res.end();
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes('Cannot destructure property')
      ) {
        const messages = await messageService.find();
        res.write(JSON.stringify(messages));

        res.end();
      } else {
        throw error;
      }
    }
  },
  createMessage: async (req, res) => {
    for await (const data of req) {
      try {
        const messageData = JSON.parse(data);
        const message = new Message(messageData);

        const { error, valid } = message.isValid();

        if (!valid) {
          res.writeHead(400, DEFAULT_HEADER);
          res.write(JSON.stringify({ error: error.join(', ') }));
          return res.end();
        }

        const id = await messageService.create(message);

        res.writeHead(201, DEFAULT_HEADER);
        res.write(
          JSON.stringify({ success: 'Message created with success!', id })
        );

        return res.end();
      } catch (error) {
        handleError(res)(error);
      }
    }
  },
  updateMessage: async (req, res) => {
    for await (const data of req) {
      try {
        const { id } = req.queryString;

        const messageExists = await messageService.find(id);

        if (messageExists.hasOwnProperty('error')) {
          res.writeHead(404, DEFAULT_HEADER);
          res.write(JSON.stringify({ error: messageExists.error }));
          return res.end();
        }

        const messageData = JSON.parse(data);
        const message = new Message(messageData);

        const { error, valid } = message.isValid();

        if (!valid) {
          res.writeHead(400, DEFAULT_HEADER);
          res.write(JSON.stringify({ error: error.join(', ') }));
          return res.end();
        }

        const updatedId = await messageService.update(id, message);

        res.writeHead(204, DEFAULT_HEADER);
        res.write(
          JSON.stringify({
            success: 'Message updated with success!',
            updatedId,
          })
        );

        return res.end();
      } catch (error) {
        handleError(res)(error);
      }
    }
  },
  deleteMessage: async (req, res) => {
    try {
      const { id } = req.queryString;

      const messageExists = await messageService.find(id);

      if (messageExists.hasOwnProperty('error')) {
        res.writeHead(404, DEFAULT_HEADER);
        res.write(JSON.stringify({ error: messageExists.error }));
        return res.end();
      }

      await messageService.delete(id);

      res.writeHead(204, DEFAULT_HEADER);
      res.write(JSON.stringify({ success: 'Message deleted with success!' }));

      return res.end();
    } catch (error) {
      handleError(res)(error);
    }
  },
};
