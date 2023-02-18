const UserRepository = require('../repositories/UserRepository');
const UserService = require('../services/UserService');

const { join } = require('path');

const filename = join(__dirname, '../../database', 'usersDatabase.json');

const generateInstance = () => {
  const userRepository = new UserRepository({
    file: filename,
  });

  const userService = new UserService({
    userRepository,
  });

  return userService;
};

module.exports = { generateInstance };
