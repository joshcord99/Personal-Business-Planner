DEPARTMENT

ID: SERIAL PRIMARY KEY

NAME: VARCHAR(30) UNIQUE NOT NULL to hold department name
role

ID: SERIAL PRIMARY KEY

TITLE: VARCHAR(30) UNIQUE NOT NULL to hold role title

SALARY: DECIMAL NOT NULL to hold role salary

DEPARATMENT_ID: INTEGER NOT NULL to hold reference to department role belongs to employee

ID: SERIAL PRIMARY KEY

FIRST_NAME: VARCHAR(30) NOT NULL to hold employee first name

LAST_NAME: VARCHAR(30) NOT NULL to hold employee last name

ROLER_ID: INTEGER NOT NULL to hold reference to employee role

MANAGER_ID: INTEGER  to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)