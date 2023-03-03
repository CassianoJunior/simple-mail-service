import { ServerResponse } from 'http';

const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
};

const handleError = (response: ServerResponse) => {
  return (error: any) => {
    console.error('Error:', error);
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: 'Internal Server Error!!' }));

    return response.end();
  };
};

export { DEFAULT_HEADER, handleError };
