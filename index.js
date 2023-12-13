const inquirer = require('inquirer');
const EmployeeDB = require('./queries');
const db = require('./config/connection');
const table = require("console.table");


async function addRolePrompt() {
  const roleInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
      validate: (input) => {
        return input.trim() !== '' || 'Please enter a valid role title.';
      },
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
      validate: (input) => {
        return !isNaN(input) || 'Please enter a valid salary (numeric value).';
      },
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID for the role:',
      validate: (input) => {
        return !isNaN(input) || 'Please enter a valid department ID (numeric value).';
      },
    },
  ]);

  try {
    await EmployeeDB.addRole(roleInfo.title, roleInfo.salary, roleInfo.departmentId);
    console.log(`Role '${roleInfo.title}' added successfully.`);
  } catch (error) {
    console.error('Error adding role:', error.message);
  }
}

async function addEmployeePrompt() {
  const employeeInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:',
      validate: (input) => {
        return input.trim() !== '' || 'Please enter a valid first name.';
      },
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:',
      validate: (input) => {
        return input.trim() !== '' || 'Please enter a valid last name.';
      },
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the role ID for the employee:',
      validate: (input) => {
        return !isNaN(input) || 'Please enter a valid role ID (numeric value).';
      },
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager ID for the employee (leave blank if none):',
      default: '', // Default to an empty string if the user doesn't enter a manager ID
    },
  ]);

  try {
    await EmployeeDB.addEmployee(employeeInfo.firstName, employeeInfo.lastName, employeeInfo.roleId, employeeInfo.managerId);
    console.log(`Employee '${employeeInfo.firstName} ${employeeInfo.lastName}' added successfully.`);
  } catch (error) {
    console.error('Error adding employee:', error.message);
  }
}

async function addDepartmentPrompt() {
  const departmentInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
      validate: (input) => {
        return input.trim() !== '' || 'Please enter a valid department name.';
      },
    },
  ]);

  try {
    await EmployeeDB.addDepartment(departmentInfo.name);
    console.log(`Department '${departmentInfo.name}' added successfully.`);
  } catch (error) {
    console.error('Error adding department:', error.message);
  }
}

// Function to prompt the user for employee and role information and update the database
async function updateEmployeeRolePrompt() {
  const updateInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee to update:',
      validate: (input) => {
        return !isNaN(input) || 'Please enter a valid employee ID (numeric value).';
      },
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the new role ID for the employee:',
      validate: (input) => {
        return !isNaN(input) || 'Please enter a valid role ID (numeric value).';
      },
    },
  ]);

  try {
    await EmployeeDB.updateEmployeeRole(updateInfo.employeeId, updateInfo.roleId);
    console.log(`Employee role updated successfully.`);
  } catch (error) {
    console.error('Error updating employee role:', error.message);
  }
}

async function start() {
  try {
    let continuePrompt = true;

    while (continuePrompt) {
      const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      });

      switch (action) {
        case 'View all departments':
          await EmployeeDB.getAllDepartments(db);
          break;

        case 'View all roles':
          await EmployeeDB.getAllRoles(db);
          break;

        case 'View all employees':
          await EmployeeDB.getAllEmployees(db);
          break;

        case 'Add a department':
          await addDepartmentPrompt(db);
          break;
          
        case 'Add a role':
          await addRolePrompt(db);
          break;
          
        case 'Add an employee':
          await addEmployeePrompt(db);
          break;
          
        case 'Update an employee role':
          await updateEmployeeRolePrompt(db);
          break;

        case 'Exit':
          console.log('Goodbye!');
          process.exit();

        default:
          console.log('Invalid choice. Please try again.');
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Close the MySQL connection when done
    await db.end();
  }
}

start();