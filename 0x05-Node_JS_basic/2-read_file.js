const fs = require('fs');

function countStudents(path) {
  let response;
  try {
    response = fs.readFileSync(path, { encoding: 'utf8' });
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const ln = response.split('\n');
  const stdnts = ln.filter((line) => line.length > 0 && !line.startsWith('firstname'));

  console.log(`Number of students: ${stdnts.length}`);

  const fields = {};
  stdnts.forEach((line) => {
    const student = line.split(',');
    const field = student[3];
    const firstname = student[0];
    if (!fields[field]) {
      fields[field] = [];
    }
    fields[field].push(firstname);
  });

  for (const [field, firstnames] of Object.entries(fields)) {
    console.log(`Number of students in ${field}: ${firstnames.length}. List: ${firstnames.join(', ')}`);
  }
}

module.exports = countStudents;
