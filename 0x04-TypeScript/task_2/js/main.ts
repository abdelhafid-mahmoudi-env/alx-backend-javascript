interface DirectorInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
}

interface TeacherInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
}

class Director implements DirectorInterface {
  workFromHome(): string {
      return "Working from home";
  }

  getCoffeeBreak(): string {
      return "Getting a coffee break";
  }

  workDirectorTasks(): string {
      return "Getting to director tasks";
  }
}

class Teacher implements TeacherInterface {
  workFromHome(): string {
      return "Cannot work from home";
  }

  getCoffeeBreak(): string {
      return "Cannot have a break";
  }

  workTeacherTasks(): string {
      return "Getting to work";
  }
}

function createEmployee(salary: number | string): Director | Teacher {
  if (typeof salary === "number" && salary < 500) {
      return new Teacher();
  } else {
      return new Director();
  }
}

function isDirector(employee: any): employee is Director {
  return employee instanceof Director;
}

function executeWork(employee: Director | Teacher): string {
  if (isDirector(employee)) {
      return employee.workDirectorTasks();
  } else {
      return employee.workTeacherTasks();
  }
}

console.log(executeWork(createEmployee(200))); // "Getting to work" (Teacher)
console.log(executeWork(createEmployee(1000))); // "Getting to director tasks" (Director)
console.log(executeWork(createEmployee('$500'))); // "Getting to director tasks" (Director)
