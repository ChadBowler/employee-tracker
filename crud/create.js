const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    },
);

function addQuery(type) {
    db.query(type, function (err, res) {
        if (err) {
            console.log(err);
        }
        return res;
    });
};

function addDepartment(name) {

    const addDeptQuery = `
    INSERT INTO department (name)
    VALUES ("${name}");
    `
    addQuery(addDeptQuery);
};

function addRole(info) {
    console.log(info);
    const addRoleQuery = `
    INSERT INTO role (title, department_id, salary)
    VALUES ("${info.roleName}", ${info.roleDepartment}, ${info.roleSalary});
    `
    addQuery(addRoleQuery);
};

function addEmployee(info) {
    const addEmpQuery = `
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("${info.employeeFirstName}", "${info.employeeLastName}", ${info.employeeRole}, ${info.employeeManager});
    `
    addQuery(addEmpQuery);
};

module.exports = {
    addDepartment: addDepartment,
    addRole: addRole,
    addEmployee: addEmployee
};