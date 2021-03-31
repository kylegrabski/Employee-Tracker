INSERT INTO department (name)
VALUES ("Sales"), ("Creative"), ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES ("Creative Director", 250000.00, 2), ("Head of Sales", 210000.00, 1), ("President", 350000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 120000, 1), ("Sales Person", 80000, 1), ("Copywriter", 55000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Bert", "Cooper", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Don", "Draper", 1), ("Pete", "Campbell", 2);