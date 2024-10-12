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
        console.error('Database connection error:');
    } else { console.log('Database connected'); }
});

function mainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'userChoices',
                message: 'Here you go !',
                choices: [
                    'View All Employees',
                    'View All Departments',
                    'View All Role',
                    'Add Employee',
                    'Add Role',
                    'Update Employee Role',
                    'Update Role',
                    'Exit'],
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
                    default:
                        pool.end();
                        process.exit();
            }
        })
}
const viewAllDepartments = () => {
    const query = "SELECT * FROM department;";
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Uh Oh! Error fetching departments');
        } else {
            console.table(result.rows);
        }
        mainMenu();
    });
};

const viewAllRole = () => {
    const query = `
        SELECT department.name AS department_name, 
               role.salary AS role_salary, 
               role.title AS role_title 
        FROM role 
        JOIN department 
        ON role.department_id = department.id;`;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Uh Oh! Error fetching roles');
        } else {
            console.table(result.rows);
        }
        mainMenu();
    });
};


const viewAllEmployees = () => {
    const query = "SELECT employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;";
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Uh Oh! Error fetching employees');
        } else {
            console.table(result.rows);
        }
        mainMenu();
    });
};
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
        }
    ]).then(answer => {
        const query = 'INSERT INTO department (name) VALUES ($1);';
        pool.query(query, [answer.name], (err) => 
            if (err) {
                console.error('Uh Oh! Error adding department');
        });
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is name of the new role?:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this particular role?:',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID that this new role falls under?:',
        }
    ]).then(answer => {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);';
        pool.query(query, [answer.title, answer.salary, answer.department_id], (err) => {
            if (err) {
                console.error('Uh Oh! Error adding role');

        });
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the new employee\'s first name?:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the new employee\'s last name?',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the employee role ID?:',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "What is the new employee's boss's ID number?:",
        }
    ]).then(answer => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);';
        pool.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err) => {
            if (err) {
                console.error('Uh Oh! Error adding new employee');
            }
            mainMenu();
        });
    });
};
const updateRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Please enter the employee ID:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please enter the new role ID:',
        }
    ]).then(answer => {
        const query = 'UPDATE employee SET role_id = $1 WHERE id = $2;';
        pool.query(query, [answer.role_id, answer.employee_id], (err) => {
            if (err) {
                console.error('Uh Oh! Error updating employee\'s role');
            }
        });
    });
};

mainMenu();
