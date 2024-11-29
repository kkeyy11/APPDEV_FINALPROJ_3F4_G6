// controllers/forecastController.js
const firebaseModel = require('../models/firebaseModel');
const ARIMA = require('arima');  // For forecasting (you can replace this with any forecasting method)

module.exports = {
  async getForecast(req, res) {
    try {
      // Fetch real-time data from Firebase
      const data = await firebaseModel.fetchRealtimeData();
      const voltage = data.voltage;
      const current = data.current;

      // Perform forecasting (this is a simple example, you can improve this part)
      const voltageForecast = forecastData([voltage]);
      const currentForecast = forecastData([current]);

      // Render the view with the data and forecasts
      res.render('index', { voltage, current, voltageForecast, currentForecast });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data');
    }
  }
};

// Function to perform simple forecasting using ARIMA
function forecastData(data) {
  const arima = new ARIMA({
    p: 1,  // Auto-regressive terms
    d: 1,  // Differencing
    q: 1   // Moving average terms
  }).train(data);

  return arima.predict(3);  // Forecast the next 3 values
}
