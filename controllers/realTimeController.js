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

    if (!results || results.length === 0) {
      return res.render("sensorData", { 
        data: [], 
        batteryPercentage: "N/A", 
        remainingTime: "N/A" 
      });
    }

    // Sum all voltages
    const totalVoltage = results.reduce((sum, record) => sum + record.voltage, 0);

    // Sum all currents
    const totalCurrent = results.reduce((sum, record) => sum + record.current, 0);

    // The maximum voltage possible: 4.2V per record
    const maxVoltage = results.length * 4.2;

    // Calculate battery percentage based on the sum of voltages
    const batteryPercentage = ((totalVoltage / maxVoltage) * 100).toFixed(2);

    // Estimate remaining charging time (simplified calculation)
    const batteryCapacity = 1000;  // Example battery capacity in mAh
    const currentFlowRate = totalCurrent * 1000;  // Convert A to mA for the calculation

    // Calculate remaining time based on total current
    let remainingTime = "N/A";
    if (batteryPercentage < 100) {
      if (currentFlowRate > 0) {
        remainingTime = ((batteryCapacity / currentFlowRate) * 60).toFixed(2); // Time in minutes
      }
    } else {
      remainingTime = "0";  // If the battery is 100%, no charging is needed
    }

    res.render("sensorData", { 
      data: results, 
      batteryPercentage, 
      remainingTime 
    });
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
