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

function addQuery(type) {
    db.query(type, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log(res);
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
    const addRoleQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    addQuery(addRoleQuery);
};

function addEmployee(info) {
    const addEmpQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    addQuery(addEmpQuery);
};

module.exports = {
    addDepartment: addDepartment,
    addRole: addRole,
    addEmployee: addEmployee
};