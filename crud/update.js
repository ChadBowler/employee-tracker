const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,

    },
    // console.log(`Connected to the manager_db database.`)
);

function updateQuery(type) {
    db.query(type, function (err, res) {
        if (err) {
            console.log(err);
        }
        return res;
    });
};


// function updateDepartment() {
//     const updateDeptQuery = `
//         SELECT
//             id AS ID,
//             name AS Department
//         FROM department;
//     `
//     updateQuery(updateDeptQuery);
// };

// function updateRole() {
//     const updateRoleQuery = `
//         SELECT
//             id AS ID,
//             name AS Department
//         FROM department;
//     `
//     updateQuery(updateRoleQuery);
// };

function updateEmployee(info) {
    const updateEmpQuery = `
        UPDATE employee
        SET role_id = ${info.newRole}
        WHERE id = ${info.employeeId}
    `
    updateQuery(updateEmpQuery);
};



module.exports = {
    // updateDepartment: updateDepartment,
    // updateRole: updateRole,
    updateEmployee: updateEmployee
};