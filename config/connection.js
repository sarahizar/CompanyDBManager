const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'IvyandBeck13!',
    database: 'employeesDB',
    port: 3306
  });
  
  
  module.exports = pool.promise();