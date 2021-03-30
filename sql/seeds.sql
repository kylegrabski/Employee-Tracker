INSERT INTO department (name)
VALUES ("Sales"), ("Creative"), ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES ("Creative Director", 250000.00, 2), ("Head of Sales", 210000.00, 1), ("President", 350000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 120000, 1), ("Sales Person", 80000, 1),
("Lead Copywriter", 80000, 2), ("Copywriter", 55000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Bert", "Cooper", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Don", "Draper", 1), ("Pete", "Campbell", 2);


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