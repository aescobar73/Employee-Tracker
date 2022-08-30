SELECT name, title, salary
FROM departments
JOIN roles ON departments.id = roles.department_id;

SELECT first_name, last_name, title, salary
FROM roles
JOIN employees ON roles.id = employees.role_id

SELECT *
FROM employees