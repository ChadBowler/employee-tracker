const { json } = require('express');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,

    },
    console.log(`Connected to the manager_db database.`)
);

function viewQuery(type) {
    db.query(type, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log(res);
        return res;
    });
};


function viewDepartments() {
    const viewDeptQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    viewQuery(viewDeptQuery);
};


function viewRoles() {
    const viewRolesQuery = `
    SELECT 
        role.id,
        role.title,
        department.name,
        role.salary
    FROM
        role
    JOIN
        department on role.department_id=department.id;
    `
    viewQuery(viewRolesQuery);
};

function viewEmployees() {
    const viewEmpQuery = `
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
    `
    viewQuery(viewEmpQuery);
};

module.exports = {
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    viewEmployees: viewEmployees
};