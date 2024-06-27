export default function createIteratorObject(report) {
    const allEmployees = [];
    for (const department in report.allEmployees) {
        allEmployees.push(...report.allEmployees[department]);
    }

    return {
        [Symbol.iterator]: function* () {
            for (const employee of allEmployees) {
                yield employee;
            }
        }
    };
}
