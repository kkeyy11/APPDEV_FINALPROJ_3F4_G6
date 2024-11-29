const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/forecastController');

router.post('/api/data', sensorController.saveSensorData);
router.get('/', sensorController.getData);

module.exports = router;
