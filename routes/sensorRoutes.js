const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.post('/api/data', sensorController.saveSensorData);
router.get('/', sensorController.getData);

module.exports = router;
