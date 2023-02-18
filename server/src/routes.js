const userController = require('./controllers/userController');
const messageController = require('./controllers/messageController');

module.exports = {
  '/users:get': userController.getUser,
  '/users:post': userController.createUser,
  '/users:put': userController.updateUser,
  '/users:delete': userController.deleteUser,
  '/messages:get': messageController.getMessage,
  '/messages:post': messageController.createMessage,
  '/messages:put': messageController.updateMessage,
  '/messages:delete': messageController.deleteMessage,

  default: async (req, res) => {
    res.write('Hello, World!');
    res.end();
  },
};
