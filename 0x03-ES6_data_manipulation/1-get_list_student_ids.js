export default function getListStudentIds(studentList) {
  let idList = [];

  if (Array.isArray(studentList)) {
    idList = studentList.map(student => student.id);
  }

  return idList;
}
