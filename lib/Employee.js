// TODO: Write code to define and export the Employee class

class Employee { 
    constructor(name, id, email,) { // constructor function with 3 parameters
        this.name = name; // record name input
        this.id = id; // record employee id
        this.email = email; // record employee email
    }

    getName() {
        return this.name; // function to return recorded name
    }

    getId() {
        return this.id; // function to return recorded id
    }

    getEmail() {
        return this.email; // function to return recorded email
    }

    getRole() {
        return "Employee"; // function to return type of role
    }
};

module.exports = Employee; // export module for use in other js files