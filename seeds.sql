INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales'),
       ('Service');

INSERT INTO role (department,salary,title)
VALUES (1,1000,'Software Engineer'),
       (2, 2000, 'Accountant'),
       (3, 3000, 'Lawyer'),
       (4, 4000, 'Chief'),
       (5, 5000, 'Customer Service');

    
INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ('Kyle','Lock',1),
        ('Ken', 'Doe',2),
        ('Angel', 'Han',3),
       ('Peter', 'Don',4),
       ('Abby', 'Gord',5, 4);
       

