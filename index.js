const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const table = cTable;

// The Manager ID is equal to the employee ID. So The manager id of 2 means the 
// employees manager is the employee with the employee ID of 2

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
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Add A Department":
          addDepartment();
          break;
        case "Exit":
          // @ ToDo fix end function
          // Error: Cannot enqueue Quit after invoking quit.
          connection.end();
      }
    });
}

// --------------View Functions------------------

function viewEmployees() {
  connection.query(
    "SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id;",
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
    // "SELECT name, title FROM department INNER JOIN role ON department.id = role.department_id;",
    "SELECT * FROM department;",
    function (err, data) {
      console.table(data);
      init();
    }
  );
}

// ----------INSERT FUNCTIONS--------------------

function addEmployee() {
    // will update the Employees Role whenever a new Role is created
    let titlesDB = [];
    connection.query("SELECT * FROM role", function(err, data){
            if (err) console.log(err, " FROM SELECTING ROLES IN addEmployee");
            for (let i = 0; i < data.length; i++) {
                titlesDB.push(data[i].title)
                
            }
    })
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
        choices: titlesDB
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
    //   switch (response.title) {
    //     case "Sales Lead":
    //       return roleID = 4, manager = 3;
          
    //     //   break;
    //     case "Sales Person":
    //       return roleID = 5, manager = 3;
          
    //     //   break;
    //     case "Lead Copywriter":
    //       return roleID = 6, manager = 2;
         
    //     //   break;
    //     case "Copy Writer":
    //         return roleID = 7, manager = 2;            
    //    }
    if (response.title === "Sales Lead"){
        roleID = 4
        manager = 3
    }else if(response.title === "Sales Person"){
        roleID = 5
        manager = 3
    }else if(response.title === "Lead Copywriter"){
        roleID = 6
        manager = 2
    }else if(response.title === "Copywriter"){
        roleID = 7
        manager = 2
    }
      const employee = connection.query(query, [response.firstName, response.lastName, roleID, manager],
        function (err, data) {
          console.log(
            "Added Employee",
            response.firstName,
            response.lastName,
            "for the position of",
            response.title
          );
          init();
        }
      );
    });
}

function addRole(){
  // will update the department_id whenever a new Department is created
  let departmentDB = [];
  connection.query("SELECT * FROM department", function(err, data){
    if (err) console.log(err, " FROM SELECTING DEPARTMENT IN add Role");
    for (let i = 0; i < data.length; i++) {
      departmentDB.push(data[i].name)
      
    }
  })
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter The Title Of The Role: "
    },
    {
      type: "input",
      name: "salary",
      message: "Enter The Salary For The Role"
    },
    {
      type: "list",
      name: "department",
      message: "To What Department Does The Role Belong?: ",
      choices: departmentDB
    }
  ])
  .then(function (response){
    console.log(response);
    const query = 
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";

    // converting the salaray response into an INT to be able to
    // insert into MySQL database
    let salary = parseInt(response.salary);

    // @ ToDo create For Loop to assign department_ID based on what user chooses instead of hardcoding. WONT SCALE.
    let department_id = 0;
    if(response.department === "Sales"){
      department_id = 1
    } else if (response.department === "Creative"){
      department_id = 2
    }else if (response.department === "Executive"){
      department_id = 3
    }

    const role = connection.query(query, [response.title, salary, department_id], function (err, data){
      if (err) console.log(err, "ERROR INSERTING NEW ROLE IN role TABLE")
      console.log("Added Role", response.title, "In The", response.department, "Department", "With A Salary Of:", salary);
      init();
    })
  })
}

function addDepartment(){
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What Is The Name Of The Department You Want To Add?: "
    }
  ])
  
}
