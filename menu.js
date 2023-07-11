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
                roleOptions().then((answers) => {
                    let roleName = []
                    let roleValue = []
                    answers[0].forEach(element => {
                        roleValue.push(element.id)
                        roleName.push(element.title)
                    })
                    roleArray = [roleName, roleValue]
                    return roleArray
                }).then(() => {
                    employeeOptions().then((answers) => {
                        let employeeName = []
                        let employeeValue = []
                        answers[0].forEach(element => {
                            employeeValue.push(element.id)
                            employeeName.push(element.name)
                        })
                        employeeArray = [employeeName, employeeValue]
                        getEmployeeInfo(roleArray, employeeArray).then((answers) => {
                            addEmployee(answers);
                            menu();
                        })
                        
                    })
                })             
                break;
            case 'Update Employee Role':
                roleOptions().then((answers) => {
                    let roleName = []
                    let roleValue = []
                    answers[0].forEach(element => {
                        roleValue.push(element.id)
                        roleName.push(element.title)
                    })
                    roleArray = [roleName, roleValue]
                    return roleArray
                }).then(() => {
                    employeeOptions().then((answers) => {
                        let employeeName = []
                        let employeeValue = []
                        answers[0].forEach(element => {
                            employeeValue.push(element.id)
                            employeeName.push(element.name)
                        })
                        employeeArray = [employeeName, employeeValue]
                        getUpdateInfo(roleArray, employeeArray).then((answers) => {
                            updateEmployee(answers);
                            menu();
                        })
                    })
                })
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
                quit();
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

function getEmployeeInfo(roleArray, employeeArray) {
    let roleChoices = []
    let employeeChoices = []
    let roleNames = roleArray[0]
    let roleValues = roleArray[1]
    let employeeNames = employeeArray[0]
    let employeeValues = employeeArray[1]
    for (let i = 0; i < roleNames.length; i++) {
        let newChoice  = new ChoicePrompt(roleNames[i], roleValues[i])
        roleChoices.push(newChoice)
    };
    for (let i = 0; i < employeeNames.length; i++) {
        let newChoice  = new ChoicePrompt(employeeNames[i], employeeValues[i])
        employeeChoices.push(newChoice)
    };
    return inquirer
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
            type: 'list',
            message: "What is the employee's role?",
            choices: roleChoices,
            name: 'employeeRole'
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            choices: employeeChoices,
            name: 'employeeManager'
        }]
    )
    .then((answers) => {
        return answers;
    });
};
function getUpdateInfo(roleArray, employeeArray) {
    let roleChoices = []
    let employeeChoices = []
    let roleNames = roleArray[0]
    let roleValues = roleArray[1]
    let employeeNames = employeeArray[0]
    let employeeValues = employeeArray[1]
    for (let i = 0; i < roleNames.length; i++) {
        let newChoice  = new ChoicePrompt(roleNames[i], roleValues[i])
        roleChoices.push(newChoice)
    };
    for (let i = 0; i < employeeNames.length; i++) {
        let newChoice  = new ChoicePrompt(employeeNames[i], employeeValues[i])
        employeeChoices.push(newChoice)
    };
    return inquirer
    .prompt([
        {
            type: 'list',
            message: "Which employee would you like to update?",
            choices: employeeChoices,
            name: 'employeeId'
        },
        {
            type: 'list',
            message: "What role do you want to give them?",
            choices: roleChoices,
            name: 'newRole'
        }
        ]
    )
    .then((answers) => {
        return answers;
    });
}

async function departmentOptions() {
    const con = await mysql.createConnection(connectionOptions)
    const deptQuery = `
        SELECT
            id AS ID,
            name AS Department
        FROM department;
    `
    return con.query(deptQuery)
};

async function roleOptions() {
    const con = await mysql.createConnection(connectionOptions)
    const roleQuery = `
        SELECT
            id,
            title
        FROM role;
    `
    return con.query(roleQuery)
};

async function employeeOptions() {
    const con = await mysql.createConnection(connectionOptions)
    const deptQuery = `
        SELECT
            id,
            CONCAT_WS(' ', employee.first_name, employee.last_name) AS name
        FROM employee;
    `
    return con.query(deptQuery)
};

async function quit() {
    const { confirm } = await inquirer.prompt([
        {
        name: "confirm",
        type: "confirm",
        message: "Are you sure you want to exit?",
        },
    ]);
    
    if (confirm) {
        process.exit();
    }
}


module.exports = menu;