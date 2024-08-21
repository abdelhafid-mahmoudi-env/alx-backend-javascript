const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    const students = lines.slice(1).filter(line => line.trim() !== '');
    console.log(`Number of students: ${students.length}`);

    const fields = {};
    students.forEach(student => {
      const [firstname, , , field] = student.split(',');
      if (!fields[field]) fields[field] = [];
      fields[field].push(firstname);
    });

    Object.keys(fields).forEach(field => {
      console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
    });

  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
