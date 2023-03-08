// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee"); // import employee parent class

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email); // use questions from parent class
        this.github = github; // additional info needed for engineer
    }

    getGithub() {
        return this.github; // return recorded github username
    }

    getRole() {
        return "Engineer"; // return employee role 
    }
};

module.exports = Engineer; // export for use in other js files