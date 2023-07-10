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

function updateQuery(type) {
    db.query(type, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log(res);
        return res;
    });
};


function updateDepartment() {
    const updateDeptQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    updateQuery(updateDeptQuery);
};

function updateRole() {
    const updateRoleQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    updateQuery(updateRoleQuery);
};

function updateEmployee() {
    const updateEmpQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    updateQuery(updateEmpQuery);
};



module.exports = {
    updateDepartment: updateDepartment,
    updateRole: updateRole,
    updateEmployee: updateEmployee
};