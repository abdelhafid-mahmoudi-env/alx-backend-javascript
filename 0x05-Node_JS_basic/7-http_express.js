const express = require('express');

const app = express();

const fs = require('fs').promises;

/**
 * Reads a CSV database file and counts the number of students,
 * grouping them by their respective fields of study.
 * @param {string} path - The path to the CSV database file.
 * @returns {Promise<string>} A promise that resolves to a formatted string
 * containing the total number of students and a breakdown by field of study.
 * @throws {Error} If the database file cannot be loaded.
 */
async function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8')
      .then((db) => {
        let data;
        const students = db.split('\n').filter((line) => line.trim() !== '');
        data = `Number of students: ${students.length - 1}`;
        const fields = {};
        students.slice(1).forEach((student) => {
          const field = student.split(',')[3];
          const name = student.split(',')[0];
          if (fields[field]) {
            fields[field].push(name);
          } else {
            fields[field] = [name];
          }
        });
        Object.keys(fields).forEach((key) => {
          data = data.concat(`\nNumber of students in ${key}: ${fields[key].length}. List: ${fields[key].join(', ')}`);
        });
        resolve(data);
      })
      .catch(() => {
        reject(new Error('Cannot load the database'));
      });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(process.argv[2])
    .then((data) => {
      res.send(`This is the list of our students\n${data}`);
    })
    .catch((err) => {
      res.send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(1245, () => {});
module.exports = app;
