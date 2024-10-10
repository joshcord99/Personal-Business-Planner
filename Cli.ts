static generateID() {
    // return a random string
    return (Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15));
}


// method to start the cli
viewAllEmployees() {
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

viewAllDepartments() {
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


viewAllRoles() {
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

addEmployee() {
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
addRole() {
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
                Cli.generateID(), answers.name, answers.role, answers.manager, []);
            // push the car to the employees array
            this.employees.push(employee);
            // perform actions on the employees
            this.performActions();
        });
}
startCli() {
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
                this.updateEmployeeRole();
            }
            else if (answers.CreateOrSelect === 'Add Role') {
                this.createVehicle();
            } else if (answers.CreateOrSelect === 'Add Department') {
                this.createVehicle();
            }
        });
}
