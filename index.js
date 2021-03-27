const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "rootroot",
  database: "employeeDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);

  init();
});

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
          "Exit",
        ],
      },
    ])
    .then(function (response) {
      switch (response.mainMenu) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Departments":
          viewDepartments();
        default:
          connection.end();
      }
    });
}

// --------------View Functions------------------

function viewEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON employee.role_id = role.id;",
    function (err, data) {
      console.table(data);
      init();
    }
  );
}

function viewRoles() {
  connection.query(
    "SELECT title, salary, name FROM role INNER JOIN department ON role.department_id = department.id;",
    function (err, data) {
      console.table(data);
      init();
    }
  );
}
