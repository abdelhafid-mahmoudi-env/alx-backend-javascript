const http = require('http');
const fs = require('fs');
const { argv } = require('process');

function countStudents(path, stream) {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter(Boolean);
    lines.shift();

    const studentInfo = lines.map((line) => {
      const [name, , , field] = line.split(',');
      return { name, field };
    });

    const fieldCounts = studentInfo.reduce((acc, { field }) => {
      acc[field] = (acc[field] || 0) + 1;
      return acc;
    }, {});

    const studentListByField = Object.keys(fieldCounts).map((field) => {
      const students = studentInfo.filter((info) => info.field === field).map((info) => info.name);
      return `Number of students in ${field}: ${fieldCounts[field]}. List: ${students.join(', ')}`;
    }).join('\n');

    const totalStudents = lines.length;
    stream.write(`Number of students: ${totalStudents}\n${studentListByField}`);
  } else {
    throw new Error('Cannot load the database');
  }
}

const hostname = 'localhost';
const port = 1245;

const app = http.createServer((req, res) => {
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

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
