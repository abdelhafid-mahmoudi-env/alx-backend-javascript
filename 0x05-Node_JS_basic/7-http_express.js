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
        let myoutput = '';
        const lns = data.toString().split('\n');
        lns.forEach((ln, index) => {
          if (ln) {
            const details = ln.split(',');
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

        myoutput += `Number of students: ${length}\n`;
        Object.entries(fields).forEach(([key, value]) => {
          if (key !== 'field') {
            const studentList = students[key].join(', ');
            myoutput += `Number of students in ${key}: ${value}. `;
            myoutput += `List: ${studentList}\n`;
          }
        });
        resolve(myoutput);
      }
    });
  });
}

app.get('/', (request, response) => {
  response.send('Hello Holberton School!');
});

app.get('/students', (request, response) => {
  countStudents(process.argv[2]).then((output) => {
    const message = ['This is the list of our students', output].join('\n');
    response.send(message);
  }).catch(() => {
    response.status(500).send('This is the list of our students\nCannot load the database');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
