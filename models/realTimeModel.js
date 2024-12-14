// models/realTimeModel.js
const mysql = require("mysql2");

// Set up the MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with your database username
  password: "", // replace with your database password
  database: "real_time_db", 
});

// Function to create sensor data
const createSensorData = (voltage, current, callback) => {
  const sql = "INSERT INTO sensor_data (voltage, current) VALUES (?, ?)";
  db.query(sql, [voltage, current], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Function to get all sensor data
const getSensorDatas = (callback) => {
  const sql = "SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 5";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Function to get a single sensor data by ID
const getSensorData = (id, callback) => {
  const sql = "SELECT * FROM sensor_data WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Function to update sensor data by ID
const updateSensorData = (id, voltage, current, callback) => {
  const sql = "UPDATE sensor_data SET voltage = ?, current = ? WHERE id = ?";
  db.query(sql, [voltage, current, id], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Function to delete sensor data by ID
const deleteSensorData = (id, callback) => {
  const sql = "DELETE FROM sensor_data WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  createSensorData,
  getSensorDatas,
  getSensorData,
  updateSensorData,
  deleteSensorData,
};
