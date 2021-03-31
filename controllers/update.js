const connection = require("../sql");
const inquirer = require("inquirer");

// update employee roles

async function updateEmployee(callBack) {
  let employeeData = [];
  let exisitingEmployees = [];
  connection.query("SELECT * FROM employee", function (err, data) {
    if (err) console.log(err, " FROM UPDATE EMPLOYEE");
    for (let j = 0; j < data.length; j++) {
      exisitingEmployees.push(data[j].first_name + " " + data[j].last_name);
      employeeData.push(data[j])
    }
  });

  let exisitingRoles = [];
  let roleData = [];
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      exisitingRoles.push(data[i].title);
      roleData.push(data[i])
    }
  });

  const questions = await inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirmEmployee",
        message: "Would You Like To Update An Employees Role?",
      },
      {
        type: "list",
        name: "updateEmployee",
        message: "What Employee Would You Like To Update?: ",
        choices: exisitingEmployees,
      },
      {
        type: "list",
        name: "updateRole",
        message: "What Role Would You Like The Employee To Have?: ",
        choices: exisitingRoles,
      },
    ])
    .then(function (response) {
        let roleID = 6;
        for (let l = 0; l < roleData.length; l++) {
            if (roleData[l].title === response.exisitingRoles){
                roleID = roleData[l].id
                console.log(response.exisitingRoles, "HERE IS THE EXISTING ROLE")
                console.log(roleData[l].title, " HERE IS THE ROLE DATA TITLE")
            }
        }
      const query = "UPDATE employee SET role_id = ? WHERE last_name = ?;";
        // get name, convert to array, get the last name out, rejoin to a string
        const lastName = response.updateEmployee.split(" ").slice(1).join(" ");
        console.log(lastName)

      const updatedRole =  connection.query(query, [roleID, lastName], function (err, data) {
          console.log("UPDATED EMPLOYEE");
          callBack();
      })
    })
}

module.exports = updateEmployee;
