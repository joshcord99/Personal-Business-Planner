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

pool.connect((err: any) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else { console.log('Database connected'); }
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
}
function viewAllEmployees() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id";
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        main();
    });
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
}
function updateRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeName',
                message: 'What is the employee\'s name? ',
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'What do you want to update this employee\'s role to?',
            },
        ]);
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
            if (answers.CreateOrSelect === 'View All Employees') {
                viewAllEmployees();
            }
            else if (answers.CreateOrSelect === 'View All Roles') {
                viewAllRole();
            }
            else if (answers.CreateOrSelect === 'View All Departments') {
                viewAllDepartments();
            }
            else if (answers.CreateOrSelect === 'Add Employee') {
                addEmployee();
            }
            else if (answers.CreateOrSelect === 'Update Employee Role') {
                updateRole();
            }
            else if (answers.CreateOrSelect === 'Add Role') {
                addRole();
            } else if (answers.CreateOrSelect === 'Add Department') {
                addDepartment();
            }
        });
}

main();