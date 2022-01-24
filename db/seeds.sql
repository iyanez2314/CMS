INSERT INTO department (name)
VALUES
("IT"),
("Engineering"),
("Legal Team"),
("Sales");


INSERT INTO role (title, salary, department_id)
VALUES
("IT Specalist", 50000.00, 1),
("Software Engineer", 60000.00, 2),
("Lawyer", 60000.00, 3),
("Salesman", 40000.00, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
("Michael", "Scott", 1, null),
("Dwightt", "Schrut", 2, 1),
("Big", "Tuna", 3, 1),
("Pam", "Beasley", 4, 1);
