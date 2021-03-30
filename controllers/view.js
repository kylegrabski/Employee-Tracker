const mysql = require("mysql");
const connection = require("../config/dbconfig");

// const view = {
//   viewEmployees: (callBack = () => {}) => {
//     connection.query(
//       "SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;",
//       function (err, data) {
//         if (err) throw err;
//         console.table(data);
//         callBack();
//       }
//     );
//     connection.end();
//   },
//   viewRoles: (callBack = () => {}) => {
//     connection.query(
//       "SELECT title, salary, name FROM role INNER JOIN department ON role.department_id = department.id;",
//       function (err, data) {
//         if (err) throw err;
//         callBack();
//       }
//     );
//     connection.end();
//   },
//   viewDepartments: (callBack = () => {}) => {
//     connection.query(
//       // "SELECT name, title FROM department INNER JOIN role ON department.id = role.department_id;",
//       "SELECT * FROM department;",
//       function (err, data) {
//         console.table(data);
//         callBack();
//       }
//     );
//     connection.end();
//   },
// };
//   connection.query(
//     "SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;",
//     function (err, data) {
//       console.table(data);
//       init;
//     }
//   );
// }

// const viewRoles = () => {
//   connection.query(
//     "SELECT title, salary, name FROM role INNER JOIN department ON role.department_id = department.id;",
//     function (err, data) {
//       console.table(data);
//       init();
//     }
//   );
// };

// const viewDepartments = () => {
//   connection.query(
//     // "SELECT name, title FROM department INNER JOIN role ON department.id = role.department_id;",
//     "SELECT * FROM department;",
//     function (err, data) {
//       console.table(data);
//       init();
//     }
//   );
// };

function viewEmployees() {
  connection.query(
    "SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;",
    function (err, data) {
      console.table(data);
      init();
    }
  );
}

module.exports = viewEmployees;
