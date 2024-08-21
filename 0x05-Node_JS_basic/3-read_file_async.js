const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, { encoding: 'utf8' })
    .then((data) => {
      const lines = data.split('\n');
      const students = lines.filter((line) => line.length > 0 && !line.startsWith('firstname'));
      console.log(`Number of students: ${students.length}`);

      const fields = {};
      students.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      });

      for (const [field, firstnames] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${firstnames.length}. List: ${firstnames.join(', ')}`);
      }
    })
    .catch((error) => {
      // En cas d'erreur lors de la lecture du fichier, comme un fichier manquant
      throw new Error(`Cannot load the database: ${error.message}`);
    });
}

module.exports = countStudents;
