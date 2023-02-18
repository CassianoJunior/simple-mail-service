module.exports = {
  handleError: (response) => {
    return (error) => {
      console.error('Error:', error);
      response.writeHead(500, DEFAULT_HEADER);
      response.write(JSON.stringify({ error: 'Internal Server Error!!' }));

      return response.end();
    };
  },
  DEFAULT_HEADER: { 'Content-Type': 'application/json' },
};
