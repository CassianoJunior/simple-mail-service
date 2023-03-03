import http, { IncomingMessage, ServerResponse } from 'http';
import { routes } from './routes';
const { DEFAULT_HEADER, handleError } = require('./utils/index.js');

const PORT = 3000;

type QueryString = { id: string };

const server = (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;
  if (url && method) {
    const [, route, id] = url.split('/');
    Object(req).queryString = { id };

    const key = `/${route}:${method.toLowerCase()}`;
    res.writeHead(200, DEFAULT_HEADER);
    const chosen = routes[key] || routes.default;

    return chosen(req, res).catch(handleError(res));
  } else {
    res.writeHead(404, DEFAULT_HEADER);
    res.end('Route is undefined');
  }
};

http
  .createServer(server)
  .listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { handleError, DEFAULT_HEADER };
