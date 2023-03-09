import { IncomingMessage, ServerResponse } from 'http';
import z from 'zod';
import { generateMessageInstance } from '../factories/MessageFactory';
import { generateParticipantInstance } from '../factories/ParticipantOnMessageFactory';
import { generateUserInstance } from '../factories/UserFactory';
import { DEFAULT_HEADER, handleError } from '../utils';
import { getUrlParams } from '../utils/handleUrlString';
import { handle } from '../utils/handleZodErrors';

const messageService = generateMessageInstance();
const participantOnMessageService = generateParticipantInstance();
const userService = generateUserInstance();

const messageController = {
  getMessage: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const urlSchema = z.object({
        id: z.string(),
      });

      const { id } = urlSchema.parse(getUrlParams(req.url));

      const result = await messageService.find(id);

      if (result.isLeft())
        return res.writeHead(404, DEFAULT_HEADER).end(result.value.message);

      res.writeHead(200, DEFAULT_HEADER).end(JSON.stringify(result.value));
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
  createMessage: async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      try {
        const messageSchema = z.object({
          message: z.object({
            body: z.string(),
            subject: z.string(),
            isRead: z.boolean().default(false),
          }),
          from: z.string(),
          to: z.array(z.string()),
        });

        const messageParsed = messageSchema.parse(JSON.parse(data.toString()));

        const recipients = messageParsed.to.map(async (recipient) => {
          const exists = await userService.findByEmail(recipient);

          if (exists.isLeft()) {
            res.writeHead(404, DEFAULT_HEADER);
            res.end(`${recipient} is not found`);
            return;
          }

          return exists.value.id;
        });

        const recipientsIds = await Promise.all(recipients);

        if (recipientsIds.some((id) => id === undefined)) return res.end();

        const result = await messageService.create(messageParsed.message, {
          senderId: messageParsed.from,
          recipientsIds: recipientsIds as string[],
        });

        if (result.isLeft()) return res.writeHead(400, DEFAULT_HEADER).end();

        return res.writeHead(201, DEFAULT_HEADER).end();
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
  updateMessage: async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      try {
        const urlSchema = z.object({
          id: z.string(),
        });

        const { id } = urlSchema.parse(getUrlParams(req.url));

        const messageSchema = z.object({
          body: z.string().optional(),
          subject: z.string().optional(),
          isRead: z.boolean().optional(),
        });

        const message = messageSchema.parse(JSON.parse(data.toString()));

        const result = await messageService.update(id, message);

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
  deleteMessage: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const urlSchema = z.object({
        id: z.string(),
      });

      const { id } = urlSchema.parse(getUrlParams(req.url));

      const result = await messageService.delete(id);

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
  readMessage: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const urlSchema = z.object({
        id: z.string(),
      });

      const { id } = urlSchema.parse(getUrlParams(req.url));

      const result = await participantOnMessageService.readMessage(id);

      if (result.isLeft())
        return res
          .writeHead(400, DEFAULT_HEADER)
          .end(result.value.message.toString());

      return res.writeHead(204, DEFAULT_HEADER).end();
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

  softDeleteMessage: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const urlSchema = z.object({
        id: z.string(),
        who: z.enum(['sender', 'recipient']),
      });

      const { id, who } = urlSchema.parse(getUrlParams(req.url));

      const result = await participantOnMessageService.softDeleteMessage(
        id,
        who
      );

      if (result.isLeft())
        return res
          .writeHead(400, DEFAULT_HEADER)
          .end(result.value.message.toString());

      return res.writeHead(204, DEFAULT_HEADER).end();
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

  replyMessage: async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      try {
        const messageSchema = z.object({
          message: z.object({
            body: z.string(),
            subject: z.string(),
            isRead: z.boolean().default(false),
          }),
          from: z.string(),
          to: z.array(z.string()),
          replyTo: z.string(),
        });

        const messageParsed = messageSchema.parse(JSON.parse(data.toString()));

        const recipients = messageParsed.to.map(async (recipient) => {
          const exists = await userService.findByEmail(recipient);

          if (exists.isLeft()) {
            res.writeHead(404, DEFAULT_HEADER);
            res.end(`${recipient} is not found`);
            return;
          }

          return exists.value.id;
        });

        const recipientsIds = await Promise.all(recipients);

        if (recipientsIds.some((id) => id === undefined)) return res.end();

        const result = await participantOnMessageService.replyToMessage(
          messageParsed.message,
          {
            senderId: messageParsed.from,
            recipientsIds: recipientsIds as string[],
          },
          messageParsed.replyTo
        );

        if (result.isLeft())
          return res.writeHead(400, DEFAULT_HEADER).end(result.value.message);

        return res.writeHead(201, DEFAULT_HEADER).end();
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

  forwardMessage: async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      try {
        const messageSchema = z.object({
          message: z.object({
            body: z.string(),
            subject: z.string(),
            isRead: z.boolean().default(false),
          }),
          from: z.string(),
          to: z.array(z.string()),
          forwardToId: z.string(),
        });

        const messageParsed = messageSchema.parse(JSON.parse(data.toString()));

        const recipients = messageParsed.to.map(async (recipient) => {
          const exists = await userService.findByEmail(recipient);

          if (exists.isLeft()) {
            res.writeHead(404, DEFAULT_HEADER);
            res.end(`${recipient} is not found`);
            return;
          }

          return exists.value.id;
        });

        const recipientsIds = await Promise.all(recipients);

        if (recipientsIds.some((id) => id === undefined)) return res.end();

        const result = await participantOnMessageService.forwardMessage(
          messageParsed.message,
          {
            senderId: messageParsed.from,
            recipientsIds: recipientsIds as string[],
          },
          messageParsed.forwardToId
        );

        if (result.isLeft())
          return res.writeHead(400, DEFAULT_HEADER).end(result.value.message);

        return res.writeHead(201, DEFAULT_HEADER).end();
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
};

export { messageController };
