const express = require('express');
const { readFile } = require('fs');

const app = express();
const port = 1245;

function countStudents(fileName) {
  const students = {};
  const fields = {};
  let length = 0;

  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let output = '';
        const lines = data.toString().split('\n');
        lines.forEach((line, index) => {
          if (line) {
            const details = line.split(',');
            const name = details[0];
            const field = details[3];
            if (!students[field]) {
              students[field] = [];
              fields[field] = 0;
            }
            students[field].push(name);
            fields[field] += 1;
          }
          if (index > 0) {
            length += 1;
          }
        });

        output += `Number of students: ${length}\n`;
        Object.entries(fields).forEach(([key, value]) => {
          if (key !== 'field') {
            const studentList = students[key].join(', ');
            output += `Number of students in ${key}: ${value}. `;
            output += `List: ${studentList}\n`;
          }
        });
        resolve(output);
      }
    });
  });
}

app.get('/', (request, response) => {
  response.send('Hello Holberton School!');
});

app.get('/students', (request, response) => {
  countStudents(process.argv[2]).then((output) => {
    const responseMessage = ['This is the list of our students', output].join('\n');
    response.send(responseMessage);
  }).catch(() => {
    response.status(500).send('This is the list of our students\nCannot load the database');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
