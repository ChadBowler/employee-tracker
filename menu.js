const inquirer = require('inquirer');
// inquirer.registerPrompt("table", require("./index"))


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
        switch (answers) {
            case 'View All Employees':
                
                break;
            case 'Add Employee':
            
                break;
            case 'Update Employee Role':
            
                break;
            case 'View All Roles':
            
                break;
            case 'Add Role':
            
                break;
            case 'View All Departments':
            
                break;
            case 'Add Department':
            
                break;
            case 'Quit':
            
                break;
        
            default:
                break;
        }
        console.log(answers);
       
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error(error);
        } else {
            console.error(error);
        }
    });
}

module.exports = menu;


// [
//     {
//       type: "table",
//       name: "workoutPlan",
//       message: "Choose your workout plan for next week",
//       columns: [
//         {
//           name: "Create",
//           value: "create"
//         },
//         {
//           name: "Read",
//           value: "read"
//         },
//         {
//           name: "Update",
//           value: "update"
//         },
//         {
//           name: "Delete",
//           value: "delete"
//         }
//       ],
//       rows: [
//         {
//           name: "Departments",
//           value: "departments"
//         },
//         {
//           name: "Roles",
//           value: "roles"
//         },
//         {
//           name: "Employees",
//           value: "employees"
//         }
//       ]
//     }
//   ];