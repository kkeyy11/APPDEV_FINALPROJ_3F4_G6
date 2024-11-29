const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sensor_data_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
});

module.exports = db;