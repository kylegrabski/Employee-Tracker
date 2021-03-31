const connection = require("./sql")
const inquirer = require("inquirer");
// GET EXPORT TO WORK
const { viewEmployees } = require("./controllers/view");
const {addEmployee, addDepartment, addRole} = require("./controllers/create")



// The Manager ID is equal to the employee ID. So The manager id of 2 means the
// employees manager is the employee with the employee ID of 2

// @ToDo create ASCII art on load up
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Add An Employee",
          "Add A Role",
          "Add A Department",
          "Exit",
        ],
      },
    ])
    .then(function (response) {
      switch (response.mainMenu) {
        case "View All Employees":
          viewEmployees(init);
          break;
        case "View All Roles":
          viewRoles(init);
          break;
        case "View All Departments":
          viewDepartments(init);
          break;
        case "Add An Employee":
          addEmployee(init);
          break;
        case "Add A Role":
          addRole(init);
          break;
        case "Add A Department":
          addDepartment(init);
          break;
        case "Exit":
          // @ ToDo fix end function
          // Error: Cannot enqueue Quit after invoking quit.
          connection.end();
      }
    });
}

// start program
init();