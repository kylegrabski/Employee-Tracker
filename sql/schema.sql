DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

-- ADD MANAGER NAME TO TABLE TO MAKE IT EASIER TO READ
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(65, 2),
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT, 
    PRIMARY KEY (id)
);

-- View Employees
SELECT employee.first_name, employee.last_name, role.title
FROM employee INNER JOIN role 
ON employee.role_id = role.id;
-- INNER JOIN department.id = role.department_id;

-- View Roles
SELECT title, salary, name
FROM role INNER JOIN department
ON role.department_id = department.id; 

-- View Departments
SELECT name, title
FROM department INNER JOIN role
ON department.id = role.department_id;

SELECT title, salary, name
FROM role INNER JOIN department
ON role.department_id = department.id;