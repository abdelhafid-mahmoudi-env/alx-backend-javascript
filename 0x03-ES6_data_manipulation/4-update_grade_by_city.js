export default function updateStudentGradeByCity(
  students,
  city,
  newGrades,
) {
  const filterStudents = students.filter(
    (std) => std.location === city,
  );

  const gradeStudents = filterStudents.map(
    (std) => {
      for (const gradeInfo of newGrades) {
        if (std.id === gradeInfo.studentId) {
          std.grade = gradeInfo.grade; // eslint-disable-line no-param-reassign
        }
      }
      if (std.grade === undefined) {
        std.grade = 'N/A'; // eslint-disable-line no-param-reassign
      }
      return std;
    },
  );

  return gradeStudents;
}
