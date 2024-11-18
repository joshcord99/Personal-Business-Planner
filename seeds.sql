-- Insert departments
INSERT INTO department (name) 
VALUES 
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales'),
    ('Service');

-- Insert roles
INSERT INTO role (department_id, salary, title) 
VALUES 
    (1, 1000, 'Software Engineer'),
    (2, 2000, 'Accountant'),
    (3, 3000, 'Lawyer'),
    (4, 4000, 'Chief'),
    (5, 5000, 'Customer Service');

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
    ('Kyle', 'Lock', 1, NULL), 
    ('Ken', 'Doe', 2, NULL),    
    ('Angel', 'Han', 3, NULL), 
    ('Peter', 'Don', 4, NULL), 
    ('Abby', 'Gord', 5,NULL),    
    ('Mark', 'Twain', 1, NULL),   
    ('Lisa', 'Stone', 2, NULL);    
