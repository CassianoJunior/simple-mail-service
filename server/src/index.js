const http = require('http');
const routes = require('./routes.js');
const { DEFAULT_HEADER, handleError } = require('./utils/index.js');

const PORT = 3000;

const server = (req, res) => {
  const { url, method } = req;
  const [, route, id] = url.split('/');

  req.queryString = { id };

  const key = `/${route}:${method.toLowerCase()}`;

  res.writeHead(200, DEFAULT_HEADER);

  const chosen = routes[key] || routes.default;

  return chosen(req, res).catch(handleError(res));
};

http
  .createServer(server)
  .listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { handleError, DEFAULT_HEADER };
