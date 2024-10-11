SELECT employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id
FROM employee
LEFT JOIN role
ON role.id = employee.role_id;

SELECT role.title, department.name, role.salary 
FROM role
LEFT JOIN department
ON department.id = role.department_id;

SELECT * FROM departments


