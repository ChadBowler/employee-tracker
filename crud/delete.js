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

function deleteQuery(type) {
    db.query(type, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log(res);
        return res;
    });
};


function deleteDepartment() {
    const deleteDeptQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    deleteQuery(deleteDeptQuery);
};

function deleteRole() {
    const deleteRoleQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    deleteQuery(deleteRoleQuery);
};

function deleteEmployee() {
    const deleteEmpQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    deleteQuery(deleteEmpQuery);
};



module.exports = {
    deleteDepartment: deleteDepartment,
    deleteRole: deleteRole,
    deleteEmployee: deleteEmployee
};