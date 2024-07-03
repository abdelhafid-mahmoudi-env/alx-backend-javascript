// Definition of the Student interface
interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

// Creation of two students
const student1: Student = {
    firstName: "John",
    lastName: "Doe",
    age: 20,
    location: "Paris"
};

const student2: Student = {
    firstName: "Mary",
    lastName: "Curie",
    age: 22,
    location: "Strasbourg"
};

// List of students
const studentsList: Student[] = [student1, student2];

// Function to render an HTML table with student data
const renderTable = (): void => {
    const table = document.createElement('table');
    studentsList.forEach(student => {
        const row = table.insertRow();
        const firstNameCell = row.insertCell();
        const locationCell = row.insertCell();
        firstNameCell.textContent = student.firstName;
        locationCell.textContent = student.location;
    });
    document.body.appendChild(table);
};

// Call the renderTable function when the document is loaded
document.addEventListener('DOMContentLoaded', renderTable);
