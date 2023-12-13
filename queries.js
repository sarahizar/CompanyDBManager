const db = require('./config/connection');

class EmployeeDB {
  static async getAllDepartments() {
    try {
      const [rows, fields] = await db.query('SELECT * FROM department');
      console.table(rows);
    } catch (error) {
      console.error('Error in getAllDepartments:', error.message);
      throw error;
    }
  }

  static async getAllRoles() {
    try {
      const [rows, fields] = await db.query('SELECT * FROM role');
      console.table(rows);
    } catch (error) {
      console.error('Error in getAllRoles:', error.message);
      throw error;
    }
  }

  static async getAllEmployees() {
    try {
      const [rows, fields] = await db.query('SELECT * FROM employee');
      console.table(rows);
    } catch (error) {
      console.error('Error in getAllEmployees:', error.message);
      throw error;
    }
  }

  static async addDepartment(name) {
    try {
      await db.query('INSERT INTO department (name) VALUES (?)', [name]);
      console.log(`Department '${name}' added successfully.`);
    } catch (error) {
      console.error('Error in addDepartment:', error.message);
      throw error;
    }
  }

  static async addRole(title, salary, departmentId) {
    try {
      await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
      console.log(`Role '${title}' added successfully.`);
    } catch (error) {
      console.error('Error in addRole:', error.message);
      throw error;
    }
  }

  static async addEmployee(firstName, lastName, roleId, managerId) {
    try {
      await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
      console.log(`Employee '${firstName} ${lastName}' added successfully.`);
    } catch (error) {
      console.error('Error in addEmployee:', error.message);
      throw error;
    }
  }

  static async updateEmployeeRole(employeeId, roleId) {
    try {
      await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
      console.log(`Employee with ID ${employeeId} updated to role ID ${roleId}.`);
    } catch (error) {
      console.error('Error in updateEmployeeRole:', error.message);
      throw error;
    }
  }
}

module.exports = EmployeeDB;