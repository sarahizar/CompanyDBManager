
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Marketing'),
('Human Resources');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000.00, 1),
('Software Engineer', 75000.00, 2),
('Marketing Specialist', 60000.00, 3),
('HR Manager', 70000.00, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id) VALUES
('Sara', 'Doe', 1), 
('Jane', 'Smith', 1),
('Bob', 'Johnson', 1),
('Alice', 'Williams', 2)