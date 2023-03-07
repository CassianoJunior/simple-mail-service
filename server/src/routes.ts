import { IncomingMessage, ServerResponse } from 'http';
import { messageController } from './controllers/MessageController';
import { userController } from './controllers/UserController';

const routes: Record<string, CallableFunction> = {
  '/users:get': userController.getUser,
  '/users:post': userController.createUser,
  '/users:put': userController.updateUser,
  '/users:delete': userController.deleteUser,
  '/messages:get': messageController.getMessage,
  '/messages:post': messageController.createMessage,
  '/messages:put': messageController.updateMessage,
  '/messages:delete': messageController.softDeleteMessage,
  '/readMessage:put': messageController.readMessage,

  default: async (req: IncomingMessage, res: ServerResponse) => {
    res.write('Route not found');
    res.end();
  },
};

export { routes };
