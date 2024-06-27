export default function iterateThroughObject(reportWithIterator) {
  // Initialize an array to hold employee names
  const employeeNames = [];

  // Use the iterator to add each employee name to the array
  for (const name of reportWithIterator) {
    employeeNames.push(name);
  }

  // Join the names with '|' and return the result
  return employeeNames.join(' | ');
}
