const connection = require("./sql")
const inquirer = require("inquirer");
// GET EXPORT TO WORK
const { viewEmployees } = require("./controllers/view");
const { viewRoles } = require("./controllers/view");
const { viewDepartments } = require("./controllers/view");
const {addEmployee, addDepartment, addRole} = require("./controllers/create")
const updateEmployee  = require("./controllers/update")



// The Manager ID is equal to the employee ID. So The manager id of 2 means the
// employees manager is the employee with the employee ID of 2


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
          "Update An Employee",
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
        case "Update An Employee":
          updateEmployee(init);
          break;
        case "Exit":
          connection.end();
      }
    });
}

// start program
init();