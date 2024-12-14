const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/realTimeController');

router.post('/api/data', sensorController.saveSensorData);
router.get('/', sensorController.getData);

module.exports = router;
