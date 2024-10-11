import inquirer from "inquirer";
import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;
dotenv.config();

//connect to database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
});

function main() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'userChoices',
                message: 'This is a list of all the employees',
                choices: [
                    'View All Employees',
                    'View All Departments',
                    'View All Roles',
                    'Add Employee',
                    'Add Role',
                    'Update Employee Role',
                    'Update Role'],
            },
        ])
        .then(res => {
            switch (res.userChoices) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                    case 'Add Department':
                        addDepartment();
                        break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Update Employee Role':
                    updateRole();
                    break;
                case 'View All Role':
                    viewAllRole();
                    break;
            }
        })
}


// method to start the cli
function viewAllEmployees() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeeList',
                message: 'This is a list of all the employees',
                choices: [''],
            },
        ])
}
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the department name? ',
            },
        ])
}

function viewAllDepartments() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'departmentList',
                message: 'This is a list of all the Departments in your company',
                choices: [''],
            },
        ])
}

function viewAllRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'roleList',
                message: 'This is a list of all the roles in your company',
                choices: [''],
            },
        ])
}

function updateRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the employees name? ',
            },

            {
                type: 'input',
                name: 'name',
                message: 'What do you want to update this employees role to?',
            },
        ])
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the employees name? ',
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is his/her role at the company?',
            },
            {
                type: 'input',
                name: 'manager',
                message: 'What is his/her assigned manager name?',
            },
        ])
        .then((answers) => {
            const employee = new Employee(
                Cli.generateID(), answers.name, answers.role, answers.manager, []);
            // push the car to the employees array
            this.employees.push(employee);
            // perform actions on the employees
            this.performActions();
        });
}
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salaryRole',
                message: 'What is the salary for this particualar role?',
            },
            {
                type: 'list',
                name: 'departmentRole',
                message: 'Which department belongs to this role?',
                choices: [''],
            },
        ])
        .then((answers) => {
            const role = new role(
                // push the car to the employees array
                this.employees.push(employee);
            // perform actions on the employees
            this.performActions();
        });
}
function startCli() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'CreateOrSelect',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
            },
        ])
        .then((answers) => {
            // check if the user wants to create a new employee or view all ''

            if (answers.CreateOrSelect === 'View All Employees') {
                this.viewAllEmployees();
            }
            else if (answers.CreateOrSelect === 'View All Roles') {
                this.viewAllRoles();
            }
            else if (answers.CreateOrSelect === 'View All Departments') {
                this.viewAllDepartments();
            }
            else if (answers.CreateOrSelect === 'Add Employee') {
                this.addEmployee();
            }
            else if (answers.CreateOrSelect === 'Update Employee Role') {
                this.updateRole();
            }
            else if (answers.CreateOrSelect === 'Add Role') {
                this.addRole();
            } else if (answers.CreateOrSelect === 'Add Department') {
                this.addDepartment();
            }
        });
}
