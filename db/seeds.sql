INSERT INTO department(department_name) VALUES
('Engineering'), ('Finance'), ('Legal'), ('Sales');

INSERT INTO tableRole(title, salary, department_id) VALUES
('Sales Lead', 110000, 4), 
('Salesperson', 85000, 4), 
('Lead Engineer', 150000, 1), 
('Software Engineer', 120000, 1), 
('Account Manager', 160000, 2), 
('Accountant', 125000, 2), 
('Legal Team Lead', 250000, 3), 
('Lawyer', 190000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
('Toacin', 'Patwary', 4, null),
('Miguel', 'Gallardo', 4, 1),
('Andrew', 'Eysoldt', 1, null),
('Derrick', 'Lafforthun', 1, 3),
('Dustin', 'Moore', 1, null),
('Gayle', 'Hoefer', 2, null),
('Morgan', 'Tolman', 3, null),
('Fernando', 'Zamora', 3, null);