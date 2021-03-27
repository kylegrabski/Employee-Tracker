CREATE DATABASE employeeDB;

USE employeeDB;

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
    PRIMARY KEY (id)
);






INSERT INTO department (name)
VALUES ("Sales"), ("Creative"), ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES ("Creative Director", 250000.00, 2), ("Head of Sales", 210000.00, 1), ("President", 350000.00, 3);

SELECT title, salary, name
FROM role INNER JOIN department
ON role.department_id = department.id;