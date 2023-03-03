import { IncomingMessage, ServerResponse } from 'http';
import { generateInstance } from '../factories/UserFactory';
import { handleError } from '../utils/index.js';

const userService = generateInstance();

const userController = {
  getUser: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      // TODO - get route

      res.end();
    } catch (error) {}
  },
  createUser: async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      try {
        //TODO create route

        return res.end();
      } catch (error) {
        handleError(res)(error);
      }
    }
  },
  updateUser: async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      try {
        // TODO - update route

        return res.end();
      } catch (error) {
        handleError(res)(error);
      }
    }
  },
  deleteUser: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      // TODO - delete route

      return res.end();
    } catch (error) {
      handleError(res)(error);
    }
  },
};

export { userController };
