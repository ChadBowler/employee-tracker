const mysql = require('mysql2/promise');
const connectionOptions = {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
};

async function viewQuery(type) {
    const con = await mysql.createConnection(connectionOptions)
    return await con.query(type);
};

async function viewDepartments() {
    const viewDeptQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    return await viewQuery(viewDeptQuery);
};

async function viewRoles() {
    const viewRolesQuery = `
    SELECT 
        role.id AS ID,
        role.title AS Title,
        department.name AS Department,
        role.salary AS Salary
    FROM
        role
    JOIN
        department on role.department_id=department.id;
    `
    return await viewQuery(viewRolesQuery);
};

async function viewEmployees() {
    const viewEmpQuery = `
    SELECT 
        employee.id AS ID,
        employee.first_name AS First,
        employee.last_name AS Last,
        role.title AS Title,
        department.name AS Department,
        role.salary AS Salary,
        CONCAT_WS(' ', B.first_name, B.last_name) AS Manager
    FROM (((role
        JOIN
            employee ON role.id = employee.role_id)
        JOIN
            department on role.department_id = department.id)
        LEFT JOIN
            employee B on B.id = employee.manager_id);
    `
    return await viewQuery(viewEmpQuery);
};

module.exports = {
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    viewEmployees: viewEmployees
};