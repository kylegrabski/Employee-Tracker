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
          "Add An Employee",
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
        case "Add An Employee":
          addEmployee();
        default:
          // @ ToDo fix end function
          // Error: Cannot enqueue Quit after invoking quit.
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

function viewDepartments() {
  connection.query(
    "SELECT name, title FROM department INNER JOIN role ON department.id = role.department_id;",
    function (err, data) {
      console.table(data);
      init();
    }
  );
}

// ----------INSERT FUNCTIONS--------------------

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter The Employees First Name: ",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter The Employees Last Name: ",
    },
    {
      type: "list",
      name: "title",
      message: "Enter The Employees Role",
      choices: [
          "Sales Lead",
          "Sales Person",
          "Lead Copywriter",
          "Copywriter",
      ]
    },
   
  ]).then(function(response){
      console.log(response);
      const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id)";

       
        let roleID;
        let manager;
        switch(response.title){
            case "Sales Lead":
                return roleID = 4, manager = 3;
            case "Sales Person":
                return roleID = 5;
            case "Lead Copywriter":
                return roleID = 6, manager = 2;
        }
        const employee = connection.query(query, [response.first_name, response.last_name, roleID, manager], function(err, data){
            console.log(`Added Employee ${response.first_name} ${response.last_name} as a ${response.title}`);
            init();
        })
      
  })
}
