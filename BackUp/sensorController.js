const db = require('../models/firebaseModel');

exports.saveSensorData = (req, res) => {
  const { batteryVoltage, flowRate } = req.body;
  const query = 'INSERT INTO sensor_data (batteryVoltage, flowRate) VALUES (?, ?)';
  db.query(query, [batteryVoltage, flowRate], (err, result) => {
    if (err) {
      res.status(500).send('Error saving data');
    } else {
      res.status(200).send('Data saved successfully');
    }
  });
};

exports.getData = (req, res) => {
  const query = 'SELECT * FROM sensor_data ORDER BY id DESC LIMIT 20';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data');
    } else {
      res.render('index', { data: results });
    }
  });
};
