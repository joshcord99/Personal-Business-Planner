DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY department_id
    REFERENCES department(id)
);

CREATE TABLE employee (
id: SERIAL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER,
    FOREIGN KEY role_id
    REFERENCES role (id)
);