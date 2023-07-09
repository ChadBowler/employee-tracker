

// select role.id, role.title, department.name, role.salary from role join department on role.department_id=department.id;

/*
*VIEW ALL DEPARTMENTS*

SELECT 
    id AS ID,
    name AS Department
FROM department;


*VIEW ALL ROLES*

SELECT 
    role.id,
    role.title,
    department.name,
    role.salary
FROM
    role
JOIN
    department on role.department_id=department.id;

*VIEW ALL EMPLOYEES*

SELECT
    employee.id AS ID,
    employee.first_name AS First,
    employee.last_name AS Last,
    role.title AS Role,
    department.name AS Department,
    role.salary AS Salary,
    employee.manager_id AS Manager
FROM ((role
    INNER JOIN
        employee ON role.id = employee.role_id)
    INNER JOIN
        department on role.department_id = department.id);

*/