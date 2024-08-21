import fs from 'fs';

/**
 * Reads and processes a CSV file containing student data, 
 * organizing students into groups based on their field of study.
 * @param {String} dataPath - The path to the CSV file containing student data.
 * @returns {Promise<Object>} A promise that resolves to an object where each key 
 * represents a field of study and the value is an array of student objects.
 * Each student object contains the properties: firstname, lastname, and age.
 * @throws {Error} If the database file cannot be loaded.
 */
const readDatabase = (dataPath) => new Promise((resolve, reject) => {
  // Check if the dataPath is provided
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
    return;
  }

  // Attempt to read the CSV file
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      // Reject the promise if there is an error reading the file
      reject(new Error('Cannot load the database'));
      return;
    }

    // Process the CSV data if it was successfully read
    const fileLines = data
      .toString('utf-8')
      .trim()
      .split('\n');  // Split the file into lines

    const studentGroups = {};  // Initialize an object to store groups of students
    const dbFieldNames = fileLines[0].split(',');  // Extract the header fields
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);  // Extract the student property names

    // Iterate over each line (skipping the header)
    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');  // Split each line into individual student properties
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);  // Extract the property values
      const field = studentRecord[studentRecord.length - 1];  // Extract the student's field of study

      // If the field doesn't exist in the studentGroups, create an array for it
      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = [];
      }

      // Map the properties to their corresponding values and create a student object
      const studentEntries = studentPropNames
        .map((propName, idx) => [propName, studentPropValues[idx]]);
      studentGroups[field].push(Object.fromEntries(studentEntries));  // Add the student to the appropriate field group
    }

    // Resolve the promise with the organized student groups
    resolve(studentGroups);
  });
});

export default readDatabase;
module.exports = readDatabase;
