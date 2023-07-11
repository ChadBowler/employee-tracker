const inquirer = require('inquirer');

const read = require('./crud/read');
const viewDepartments = read.viewDepartments;
const viewRoles = read.viewRoles;
const viewEmployees = read.viewEmployees;

const create = require('./crud/create');
const addDepartment = create.addDepartment;
const addRole = create.addRole;
const addEmployee = create.addEmployee;

const update = require('./crud/update');
// const updateDepartment = update.updateDepartment;
// const updateRole = update.updateRole;
const updateEmployee = update.updateEmployee;

// const deleteItem = require('./crud/delete');
// const deleteDepartment = deleteItem.deleteDepartment;
// const deleteRole = deleteItem.deleteRole;
// const deleteEmployee = deleteItem.deleteEmployee;

function menu() {
    const mainQuestions = [ 
        {
            type: 'rawlist',
            message: "What would you like to do?",
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
            name: 'main',
        }  
    ];
    inquirer
    .prompt(mainQuestions)
    .then((answers) => {
        switch (answers.main) {
            case 'View All Employees':
                viewEmployees();
                menu();
                break;
            case 'Add Employee':
                getEmployeeInfo();
                addEmployee(info);
                menu();
                break;
            case 'Update Employee Role':
                updateEmployee();
                menu();
                break;
            case 'View All Roles':
                viewRoles();
                menu();
                break;
            case 'Add Role':
                getRoleInfo()
                addRole(info);
                menu();
                break;
            case 'View All Departments':
                viewDepartments();
                menu();
                break;
            case 'Add Department':
                getDeptName().then((answers) => {
                    addDepartment(answers.deptName);
                    menu();
                });
                break;
            case 'Quit':
            
                break;
 
        }
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error(error);
        } else {
            console.error(error);
        }
    });
};

function getDeptName() {
   return inquirer
    .prompt(
        {
            type: 'input',
            message: "What is the name of the department?",
            name: 'deptName'
        } 
    )
   
};

function getRoleInfo() {
    inquirer
    .prompt(
        {
            type: 'input',
            message: "What is the name of the role?",
            name: 'roleName'
        },
        {
            type: 'input',
            message: "What is the salary of the role?",
            name: 'roleSalary'
        },
        {
            type: 'input',
            message: "Which department does the role belong to?",
            name: 'roleDepartment'
        },
    )
    .then((answers) => {
        return answers;
    });
};

function getEmployeeInfo() {
    inquirer
    .prompt(
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'employeeFirstName'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'employeeLastName'
        },
        {
            type: 'input',
            message: "What is the employee's role?",
            name: 'employeeRole'
        },
        {
            type: 'input',
            message: "Who is the employee's manager?",
            name: 'employeeManager'
        },
    )
    .then((answers) => {
        return answers;
    });
};

module.exports = menu;