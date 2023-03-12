import http, { IncomingMessage, ServerResponse } from 'http';
import { routes } from './routes';
import { formatUrl, getUrlRoutes } from './utils/handleUrlString';
import { DEFAULT_HEADER, handleError } from './utils/index.js';

const PORT = 3333;

const server = (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;
  if (url && method) {
    console.log(url);
    res.writeHead(200, DEFAULT_HEADER);
    const formattedUrl = formatUrl(url);
    if (formattedUrl instanceof Error) {
      res.writeHead(400, DEFAULT_HEADER);
      return res.end(formattedUrl.message);
    } else {
      req.url = formattedUrl;
      const routeOrError = getUrlRoutes(formattedUrl);
      if (routeOrError instanceof Error) throw new Error();
      const route = routeOrError.split('?')[0];
      const chosen =
        routes[`/${route}:${method.toLowerCase()}`] || routes.default;

      console.log(formattedUrl, `${route}:${method.toLowerCase()}`);

      return chosen(req, res).catch(handleError(res));
    }
  } else {
    res.writeHead(404, DEFAULT_HEADER);
    res.end('Route is undefined');
  }
};

http
  .createServer(server)
  .listen(PORT, () => console.log(`Server running on port ${PORT}`));
