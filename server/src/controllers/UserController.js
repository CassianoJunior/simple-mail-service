const { handleError, DEFAULT_HEADER } = require('../utils/index.js');
const User = require('../entities/User');
const { generateInstance } = require('../factories/UserFactory');

const userService = generateInstance();

module.exports = {
  getUser: async (req, res) => {
    try {
      const { id } = req.queryString;
      const user = await userService.find(id);
      res.write(JSON.stringify(user));

      res.end();
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes('Cannot destructure property')
      ) {
        const users = await userService.find();
        res.write(JSON.stringify(users));

        res.end();
      } else {
        throw error;
      }
    }
  },
  createUser: async (req, res) => {
    for await (const data of req) {
      try {
        const userData = JSON.parse(data);
        const user = new User(userData);

        const { error, valid } = user.isValid();

        if (!valid) {
          res.writeHead(400, DEFAULT_HEADER);
          res.write(JSON.stringify({ error: error.join(', ') }));
          return res.end();
        }

        const id = await userService.create(user);

        res.writeHead(201, DEFAULT_HEADER);
        res.write(
          JSON.stringify({ success: 'User created with success!', id })
        );

        return res.end();
      } catch (error) {
        handleError(res)(error);
      }
    }
  },
  updateUser: async (req, res) => {
    for await (const data of req) {
      try {
        const { id } = req.queryString;

        const userExists = await userService.find(id);

        if (userExists.hasOwnProperty('error')) {
          res.writeHead(404, DEFAULT_HEADER);
          res.write(JSON.stringify({ error: userExists.error }));
          return res.end();
        }

        const userData = JSON.parse(data);
        const user = new User(userData);

        const { error, valid } = user.isValid();

        if (!valid) {
          res.writeHead(400, DEFAULT_HEADER);
          res.write(JSON.stringify({ error: error.join(', ') }));
          return res.end();
        }

        const updatedId = await userService.update(id, user);

        res.writeHead(204, DEFAULT_HEADER);
        res.write(
          JSON.stringify({ success: 'User updated with success!', updatedId })
        );

        return res.end();
      } catch (error) {
        handleError(res)(error);
      }
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.queryString;

      const userExists = await userService.find(id);

      if (userExists.hasOwnProperty('error')) {
        res.writeHead(404, DEFAULT_HEADER);
        res.write(JSON.stringify({ error: userExists.error }));
        return res.end();
      }

      await userService.delete(id);

      res.writeHead(204, DEFAULT_HEADER);
      res.write(JSON.stringify({ success: 'User deleted with success!' }));

      return res.end();
    } catch (error) {
      handleError(res)(error);
    }
  },
};
