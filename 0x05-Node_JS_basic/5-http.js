const http = require('http');
const fs = require('fs');
const { argv } = require('process');

function countStudents(path, stream) {
  if (fs.existsSync(path)) {
    const response = fs.readFileSync(path, 'utf8');
    const lns = response.split('\n').filter(Boolean);
    lns.shift();

    const infos = lns.map((line) => {
      const [name, , , field] = line.split(',');
      return { name, field };
    });

    const counts = infos.reduce((acc, { field }) => {
      acc[field] = (acc[field] || 0) + 1;
      return acc;
    }, {});

    const list_fields = Object.keys(counts).map((field) => {
      const students = infos.filter((info) => info.field === field).map((info) => info.name);
      return `Number of students in ${field}: ${counts[field]}. List: ${students.join(', ')}`;
    }).join('\n');

    const total = lns.length;
    stream.write(`Number of students: ${total}\n${list_fields}`);
  } else {
    throw new Error('Cannot load the database');
  }
}

const host_name = 'localhost';
const host_port = 1245;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    try {
      countStudents(argv[2], res);
      res.end();
    } catch (err) {
      res.end(err.message);
    }
  } else {
    res.writeHead(404);
    res.end('Resource not found');
  }
});

server.listen(host_port, host_name, () => {
  console.log(`Server running at http://${host_name}:${host_port}/`);
});

module.exports = server;
