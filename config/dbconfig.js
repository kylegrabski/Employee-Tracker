const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "rootroot",
    database: "employeeDB",
    // host: process.env.HOST,
  
    // port: process.env.PORT,
  
    // user: process.env.USER,
  
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE,
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
  
  });

  connection.query = util.promisify(connection.query);

  module.exports = connection;