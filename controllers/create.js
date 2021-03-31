const connection = require("../sql");
const inquirer = require("inquirer");

// --------adding an employee-----------

function addEmployee(callBack) {
  // will update the Employees Role whenever a new Role is created
  let titlesDB = [];
  let roleData = [];
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) console.log(err, " FROM SELECTING ROLES IN addEmployee");
    for (let i = 0; i < data.length; i++) {
      // Empty roleData everytime it pushes new data  
      titlesDB.push(data[i].title);
      // Push all role data into global scoped roleData array
      roleData.push(data[i]);
    }
  });
  inquirer
    .prompt([
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
        choices: titlesDB,
      },
    ])
    .then(function (response) {
      console.log(response);
      const query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";

      // @ ToDo create For Loop to assign roleID and manager
      // based on what user chooses instead of hard coding. WONT SCALE
      let roleID = 0;
      let manager = 0;

      // @ToDo FIX ROLE ID SO IT CHANGES WITH CREATED ROLE
      for (let j = 0; j < roleData.length; j++) {
        if(roleData[j].title === response.title){
          roleID = roleData[j].id 
        }
        
      }
      const employee = connection.query(
        query,
        [response.firstName, response.lastName, roleID, manager],
        function (err, data) {
          console.log(
            "Added Employee",
            response.firstName,
            response.lastName,
            "for the position of",
            response.title
          );
          callBack();
        }
      );
    });
}

// -------adding a role-----------------

function addRole(callBack) {
  // will update the department_id whenever a new Department is created
  let departmentDB = [];
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) console.log(err, " FROM SELECTING DEPARTMENT IN add Role");
    for (let i = 0; i < data.length; i++) {
      departmentDB.push(data[i].name);
    }
  });

  let existingRoles = [];
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) console.log(err, " FROM SELECTING ROLES IN addRole");
    for (let i = 0; i < data.length; i++) {
      existingRoles.push(data[i].title);
    }
  });

  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter The Title Of The Role: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter The Salary For The Role",
      },
      {
        type: "list",
        name: "department",
        message: "To What Department Does The Role Belong?: ",
        choices: departmentDB,
      },
    ])
    .then(function (response) {
      console.log(response);

      for (let i = 0; i < existingRoles.length; i++) {
        if (existingRoles[i] === response.title) {
          console.log("That Roles Already Exists");
          return init();
        }
      }

      // converting the salary response into an INT to be able to
      // insert into MySQL database
      let salary = parseInt(response.salary);

      // @ ToDo create For Loop to assign department_ID based on what user chooses instead of hardcoding. WONT SCALE.
      let department_id = 0;
      if (response.department === "Sales") {
        department_id = 1;
      } else if (response.department === "Creative") {
        department_id = 2;
      } else if (response.department === "Executive") {
        department_id = 3;
      } else if (response.department === "Art") {
        department_id = 4;
      } else if (response.department === "Communication") {
        department_id = 5;
      } else {
        department_id = departmentDB.length - 1;
      }

      const query =
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";

      const role = connection.query(
        query,
        [response.title, salary, department_id],
        function (err, data) {
          if (err) console.log(err, "ERROR INSERTING NEW ROLE IN role TABLE");
          console.log(
            "Added Role",
            response.title,
            "In The",
            response.department,
            "Department",
            "With A Salary Of:",
            salary
          );
          callBack();
        }
      );
    });
}

// ------adding a department------------

function addDepartment(callBack) {
  let existingDepartments = [];
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) console.log(err, " FROM SELECTING TITLES FROM DEPARTMENT");
    for (let i = 0; i < data.length; i++) {
      existingDepartments.push(data[i].name);
    }
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What Is The Name Of The Department You Want To Add?: ",
      },
    ])
    .then(function (response) {
      // IF department exists, throw error and return to main menu
      for (let i = 0; i < existingDepartments.length; i++) {
        if (existingDepartments[i] === response.title) {
          console.log("That Department Already Exists");
          return init();
        }
      }
      const query = "INSERT INTO department (name) VALUES (?);";

      const department = connection.query(
        query,
        [response.title],
        function (err, data) {
          if (err) console.log(err, " ERROR INSERTING NEW DEPARTMENT");
          console.log("Added", response.title, "Department");
          callBack();
        }
      );
    });
}

module.exports = { addEmployee, addRole, addDepartment };
