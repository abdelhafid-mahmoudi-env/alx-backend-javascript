const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

server.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = server;
