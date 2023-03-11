import { IncomingMessage, ServerResponse } from 'http';
import { z } from 'zod';
import { generateUserInstance } from '../factories/UserFactory';
import { getUrlParams } from '../utils/handleUrlString';
import { handle } from '../utils/handleZodErrors';
import { DEFAULT_HEADER, handleError } from '../utils/index.js';

const userService = generateUserInstance();

const userController = {
  getUser: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const urlSchema = z.object({
        email: z.string().email(),
      });

      const { email } = urlSchema.parse(getUrlParams(req.url));
      const result = await userService.findByEmail(email);

      if (result.isLeft())
        return res.writeHead(404, DEFAULT_HEADER).end(result.value.message);

      res.writeHead(200, DEFAULT_HEADER);
      res.write(JSON.stringify(result.value));
      res.end();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = handle(err);
        res.writeHead(400, DEFAULT_HEADER);
        res.end(errorMessage);
      } else {
        handleError(res)(err);
      }
    }
  },
  createUser: async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      try {
        const userSchema = z.object({
          name: z.string(),
          email: z.string().email(),
        });

        const user = userSchema.parse(JSON.parse(data.toString()));

        const result = await userService.create(user);

        if (result.isLeft())
          return res.writeHead(400, DEFAULT_HEADER).end(result.value.message);

        return res.writeHead(201, DEFAULT_HEADER).end();
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMessage = handle(error);
          res.writeHead(400, DEFAULT_HEADER);
          res.end(errorMessage);
        } else {
          handleError(res)(error);
        }
      }
    }
  },
  updateUser: async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      try {
        const urlSchema = z.object({
          id: z.string(),
        });

        const userSchema = z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
        });

        const { id } = urlSchema.parse(getUrlParams(req.url));
        const userData = userSchema.parse(JSON.parse(data.toString()));

        const result = await userService.update(id, userData);

        if (result.isLeft())
          return res.writeHead(400, DEFAULT_HEADER).end(result.value.message);

        return res.writeHead(204, DEFAULT_HEADER).end();
      } catch (err) {
        if (err instanceof z.ZodError) {
          const errorMessage = handle(err);
          res.writeHead(400, DEFAULT_HEADER);
          res.end(errorMessage);
        } else {
          handleError(res)(err);
        }
      }
    }
  },
  deleteUser: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const urlSchema = z.object({
        id: z.string(),
      });

      const { id } = urlSchema.parse(getUrlParams(req.url));

      const result = await userService.delete(id);

      if (result.isLeft())
        return res.writeHead(400, DEFAULT_HEADER).end(result.value.message);

      return res.writeHead(202, DEFAULT_HEADER).end();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = handle(err);
        res.writeHead(400, DEFAULT_HEADER);
        res.end(`${errorMessage} in url`);
      } else {
        handleError(res)(err);
      }
    }
  },
};

export { userController };
