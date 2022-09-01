INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO roles (title, salary,department_id)
VALUES ("Sales Lead", 10000.00, 4),
       ("Software Engineer", 120000.00, 1),
       ("Lawyer", 190000.00, 3),
       ("Accountant", 125000.00, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Foster",1, null),
       ("Peter", "Parker", 4, null),
       ("Mary", "Jane", 3, null),
       ("Tony", "Stark", 2, null);