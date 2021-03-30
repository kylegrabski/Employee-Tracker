const connection = require("../sql");

function viewEmployees(callBack) {
    connection.query(
      "SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;",
      function (err, data) {
        console.table(data);
        callBack()
      }
    );
  }

  function viewRoles(callBack) {
    connection.query(
      "SELECT title, salary, name FROM role INNER JOIN department ON role.department_id = department.id;",
      function (err, data) {
        console.table(data);
        callBack();
      }
    );
  }

  function viewDepartments(callBack) {
    connection.query(
      "SELECT * FROM department;",
      function (err, data) {
        console.table(data);
        callBack();
      }
    );
  }

module.exports = {viewEmployees, viewRoles, viewDepartments};