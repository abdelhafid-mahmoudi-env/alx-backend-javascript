export default function getStudentIdsSum(students) {
  return students.reduce((pop, student) => pop + student.id, 0);
}
