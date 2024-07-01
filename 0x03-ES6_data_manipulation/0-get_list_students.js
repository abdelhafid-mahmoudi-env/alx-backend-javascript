const guillaume = {
  id: 1,
  firstName: 'Guillaume',
  location: 'San Francisco',
};

const james = {
  id: 2,
  firstName: 'James',
  location: 'Columbia',
};

const serena = {
  id: 5,
  firstName: 'Serena',
  location: 'San Francisco',
};

const students = [guillaume, james, serena];

export default function getListStudents() {
  return students;
}
