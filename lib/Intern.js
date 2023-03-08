// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee"); // import employee parent class

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email); // use parent class parameters
        this.school = school; // additional questions for intern 
    }

    getRole() {
        return "Intern"; // return role 
    }

    getSchool() {
        return this.school // return school entered 
    }
};

module.exports = Intern; // export for use elsewhere