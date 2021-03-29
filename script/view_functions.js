// @ ToDo GET EXPORT TO WORK!

const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "rootroot",
    database: "employeeDB",
  });

const viewEmployees = () => {
    connection.query(
      "SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id;",
      function (err, data) {
        console.table(data);
        init();
      }
    );
  }

const viewRoles = () => {
    connection.query(
      "SELECT title, salary, name FROM role INNER JOIN department ON role.department_id = department.id;",
      function (err, data) {
        console.table(data);
        init();
      }
    );
  }

const viewDepartments = () => {
    connection.query(
      // "SELECT name, title FROM department INNER JOIN role ON department.id = role.department_id;",
      "SELECT * FROM department;",
      function (err, data) {
        console.table(data);
        init();
      }
    );
  }

module.exports = {
    viewEmployees,
    viewRoles,
    viewDepartments
}