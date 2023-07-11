const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const connectionOptions = {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,

}

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

class ChoicePrompt {
    constructor(name, value) {
        this.name = name
        this.value = value
    }
}

const db = mysql.createConnection(connectionOptions);

function menu() {
    console.log('');
    const mainQuestions = [ 
        {
            type: 'list',
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
                departmentOptions().then((answers) => {
                        let options = [];
                        let optionsValue = []
                        answers[0].forEach(element => {
                            optionsValue.push(element.ID)
                            options.push(element.Department)
                        })
                    getRoleInfo(options, optionsValue).then((answers) => {
                        addRole(answers)
                        menu();
                    })
                })
                
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

function getRoleInfo(options, optionsValue) {
    let promptChoices = []
    for (let i = 0; i < options.length; i++) {
        let newChoice  = new ChoicePrompt(options[i], optionsValue[i])
        promptChoices.push(newChoice)
    }
        
    return inquirer
    .prompt([
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
            type: 'list',
            message: "Which department does the role belong to?",
            choices: promptChoices,
            name: 'roleDepartment'
        }]
    )
    .then((answers) => {
        return answers;
    });
};

function getEmployeeInfo() {
    inquirer
    .prompt([
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
        }]
    )
    .then((answers) => {
        return answers;
    });
};

async function departmentOptions() {
    const con = await mysql.createConnection(connectionOptions)
    const deptQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    return con.query(deptQuery 
    //     function (err, res) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     let options = [];
    //     res.forEach(element => {
    //         options.push(element.Department)
    //     });
    //     console.log(options);
    //     return options;
    // }
    )
}

module.exports = menu;