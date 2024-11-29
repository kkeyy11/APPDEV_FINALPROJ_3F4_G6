// routes/routes.js
const express = require('express');
const router = express.Router();
const forecastController = require('../controllers/forecastController');

// Route for fetching and displaying the forecast
router.get('/', forecastController.getForecast);  // Main route to display data and forecast

module.exports = router;
