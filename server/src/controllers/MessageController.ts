import { IncomingMessage, ServerResponse } from 'http';
import { generateInstance } from '../factories/MessageFactory';
import { handleError } from '../utils';

const messageService = generateInstance();

const messageControler = {
  getMessage: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      // TODO - get route

      res.end();
    } catch (error) {}
  },
  createMessage: async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      try {
        //TODO create route

        return res.end();
      } catch (error) {
        handleError(res)(error);
      }
    }
  },
  updateMessage: async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      try {
        //TODO update route

        return res.end();
      } catch (error) {
        handleError(res)(error);
      }
    }
  },
  deleteMessage: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      // TODO delete route

      return res.end();
    } catch (error) {
      handleError(res)(error);
    }
  },
};

export { messageControler };
