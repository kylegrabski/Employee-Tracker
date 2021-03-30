DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

-- ADD MANAGER NAME TO TABLE TO MAKE IT EASIER TO READ
CREATE TABLE IF NOT EXISTS department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(65, 2),
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    KEY "department_id" ("department_id"), 
    CONSTRAINT 'role_ibfk_1' FOREIGN KEY ('department_id') REFERENCES 'department' ('id') 
);

CREATE TABLE IF NOT EXISTS employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT DEFAULT NULL, 
    PRIMARY KEY (id),
    KEY "role_id" ("role_id"), 
    KEY "manager_id" ("manager_id"), 
    CONSTRAINT 'employee_ibfk_1' FOREIGN KEY ('role_id') REFERENCES 'role' ('id'),
    CONSTRAINT 'employee_ibfk_2' FOREIGN KEY ('manager_id') REFERENCES 'role' ('id') 
);