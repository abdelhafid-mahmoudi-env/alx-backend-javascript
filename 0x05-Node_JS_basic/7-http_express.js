const express = require('express');
const fs = require('fs');

// Initialize Express app and define the port
const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Parses a CSV file containing student data and counts the number of students.
 * @param {String} filePath The path to the CSV data file.
 * @returns {Promise<String>} A promise that resolves to a report string.
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const reportLines = [];
    const fileLines = data.toString('utf-8').trim().split('\n');

    if (fileLines.length < 2) {
      reject(new Error('No valid student data found'));
      return;
    }

    const studentGroups = {};
    const headers = fileLines[0].split(',');
    const studentProps = headers.slice(0, headers.length - 1);

    for (const line of fileLines.slice(1)) {
      const studentData = line.split(',');
      if (studentData.length !== headers.length) continue;

      const field = studentData[studentData.length - 1];
      const studentInfo = studentProps.reduce((acc, prop, index) => {
        acc[prop] = studentData[index];
        return acc;
      }, {});

      if (!studentGroups[field]) {
        studentGroups[field] = [];
      }
      studentGroups[field].push(studentInfo);
    }

    const totalStudents = Object.values(studentGroups)
      .reduce((acc, group) => acc + group.length, 0);

    reportLines.push(`Number of students: ${totalStudents}`);
    Object.entries(studentGroups).forEach(([field, group]) => {
      reportLines.push(`Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`);
    });

    resolve(reportLines.join('\n'));
  });
});

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define the students route
app.get('/students', (req, res) => {
  const responseLines = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseLines.push(report);
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(responseLines.join('\n'));
    })
    .catch((err) => {
      responseLines.push(err.message);
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(responseLines.join('\n'));
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
