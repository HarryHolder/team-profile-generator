const Manager = require("./lib/Manager"); // import manager.js
const Engineer = require("./lib/Engineer"); // import engineer.js
const Intern = require("./lib/Intern"); // import intern.js
const inquirer = require("inquirer"); // import inquirer module 
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output"); // Create directory for created file
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamData = [];
const teamIds = [];

console.log("Welcome to team generator, follow the prompts to create your team profile");

function profileBuilder() {
    function addManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Enter the team managers name",
                validate: (response) => {
                    if (response !== "") {
                        return true;
                    }
                    return "Please enter at lest one character";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "Enter the team managers ID",
                validate: (response) => {
                    const ok = response.match(/^[0-9]\d*$/) // regular expression that checks that entry is a sequence of digits using 0-9 
                    if (ok) {
                        return true;
                    }
                    return "Please enter any number of digits between 0-9";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Enter the team managers email address",
                validate: (response) => {
                    const ok = response.match(/\S+@\S+\.\S+/) // regular expression that checks that entry matches a valid email format
                    if (ok) {
                        return true;
                    }
                    return "Please enter a valid email address";
                } 
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Enter the team managers office number",
                validate: (response) => {
                    const ok = response.match(/^[0-9]\d*$/) // regular expression that checks that entry is a sequence of digits using 0-9 
                    if (ok) {
                        return true;
                    }
                    return "Please enter any number of digits between 0-9";
                }
            }
        ]) 
        .then((responses) => {
            const manager = new Manager(
                responses.managerName,
                responses.managerId,
                responses.managerEmail,
                responses.officeNumber,
            )
            teamData.push(manager);
            teamIds.push(responses.managerId);
            employeeMenu();
        })
    }
    function employeeMenu() {
        inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do next?",
                choices: ["Add an engineer", "Add an intern", "Finish building team profile"]
            }
        ])
        .then((response) => {
            switch (response.choice) {
                case "Add an engineer":
                    addEngineer();
                    break;
                case "Add an intern":
                    addIntern();
                default:
                    createProfile();
            }
        })
    }
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Enter the engineers name",
                validate: (response) => {
                    if (response !== "") {
                        return true;
                    }
                    return "Please enter at lest one character";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "Enter the engineer ID",
                validate: (response) => {
                    const ok = response.match(/^[0-9]\d*$/) // regular expression that checks that entry is a sequence of digits using 0-9 
                    if (ok) {
                        if (teamIds.includes(response)) {
                            return "This ID is already taken, please enter a different value";
                        } else {
                        return true;
                        }
                    }
                    return "Please enter any number of digits between 0-9";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Enter the engineers email address",
                validate: (response) => {
                    const ok = response.match(/\S+@\S+\.\S+/) // regular expression that checks that entry matches a valid email format
                    if (ok) {
                        return true;
                    }
                    return "Please enter a valid email address";
                } 
            },
            {
                type: "input",
                name: "gitHub",
                message: "Enter the engineers GitHub username",
                validate: (response) => {
                    if (response !== "") {
                        return true;
                    }
                    return "Please enter at lest one character";
                }
            }
        ]) 
        .then((responses) => {
            const engineer = new Engineer(
                responses.engineerName,
                responses.engineerId,
                responses.engineerEmail,
                responses.gitHub,
            )
            teamData.push(engineer);
            teamIds.push(responses.engineerId);
            employeeMenu();
        }) // add intern function
    }
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Enter the interns name",
                validate: (response) => {
                    if (response !== "") {
                        return true;
                    }
                    return "Please enter at lest one character";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "Enter the interns ID",
                validate: (response) => {
                    const ok = response.match(/^[0-9]\d*$/) // regular expression that checks that entry is a sequence of digits using 0-9 
                    if (ok) {
                        if (teamIds.includes(response)) {
                            return "This ID is already taken, please enter a different value";
                        } else {
                        return true;
                        }
                    }
                    return "Please enter any number of digits between 0-9";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "Enter the interns email address",
                validate: (response) => {
                    const ok = response.match(/\S+@\S+\.\S+/) // regular expression that checks that entry matches a valid email format
                    if (ok) {
                        return true;
                    }
                    return "Please enter a valid email address";
                } 
            },
            {
                type: "input",
                name: "internSchool",
                message: "Enter the interns school",
                validate: (response) => {
                    if (response !== "") {
                        return true;
                    }
                    return "Please enter at lest one character";
                }
            },
        ]) 
        .then((responses) => {
            const intern = new Intern(
                responses.internName,
                responses.internId,
                responses.internEmail,
                responses.internSchool,
            )
            teamData.push(intern);
            teamIds.push(responses.internId);
            employeeMenu();
        }) // -------
    }
    function createProfile () {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(teamData), "utf-8")
    }
    addManager();
}

profileBuilder();

