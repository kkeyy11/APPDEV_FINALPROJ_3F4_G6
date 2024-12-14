const realTimeModel = require("../models/realTimeModel");

const createSensorData = (req, res) => {
  const { voltage, current } = req.body; // Removed timestamp, as it will be auto-generated
  realTimeModel.createSensorData(voltage, current, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error inserting sensor data", error: err });
    }
    res.status(201).json({ message: "Sensor data created successfully", data: result });
  });
};

const getSensorDatas = (req, res) => {
  realTimeModel.getSensorDatas((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching sensor data", error: err });
    }
    // Render the EJS template with the sensor data
    res.render("sensorData", { data: results });
  });
};

const getSensorData = (req, res) => {
  const { id } = req.params;
  realTimeModel.getSensorData(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching sensor data", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Sensor data not found" });
    }
    res.status(200).json({ data: result });
  });
};

const updateSensorData = (req, res) => {
  const { id } = req.params;
  const { voltage, current } = req.body; // Removed timestamp, as it will be auto-generated
  realTimeModel.updateSensorData(id, voltage, current, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating sensor data", error: err });
    }
    res.status(200).json({ message: "Sensor data updated successfully", data: result });
  });
};

const deleteSensorData = (req, res) => {
  const { id } = req.params;
  realTimeModel.deleteSensorData(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting sensor data", error: err });
    }
    res.status(200).json({ message: "Sensor data deleted successfully" });
  });
};

module.exports = {
  createSensorData,
  getSensorDatas,
  getSensorData,
  updateSensorData,
  deleteSensorData,
};
