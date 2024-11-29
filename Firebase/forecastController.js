  const firebaseModel = require('../models/firebaseModel');

  module.exports = {
    async getForecast(req, res) {
      try {
        // Fetch real-time data from Firebase
        const data = await firebaseModel.fetchRealtimeData();

        // Ensure data is in the expected format (voltage and current should be arrays for forecasting)
        const voltage = data.map(item => item.voltage); // Assuming each item has a 'voltage' value
        const current = data.map(item => item.current); // Assuming each item has a 'current' value

        // Perform forecasting for voltage and current using a simple moving average
        const voltageForecast = await forecastData(voltage);
        const currentForecast = await forecastData(current);

        // Render the view with the real-time data and forecasts
        res.render('index', { voltage, current, voltageForecast, currentForecast });
      } catch (error) {
        console.error('Error in getForecast:', error);
        res.status(500).send('Error fetching or forecasting data');
      }
    }
  };

  // Function to perform simple forecasting using moving averages
  async function forecastData(data) {
    try {
      const forecastLength = 3; // Number of future values to forecast
      const movingAveragePeriod = 5; // Period for the moving average (e.g., average of last 5 data points)

      let forecast = [];

      // Calculate the moving average for the last `movingAveragePeriod` data points
      for (let i = 0; i < forecastLength; i++) {
        const startIndex = Math.max(0, data.length - movingAveragePeriod);
        const recentData = data.slice(startIndex);
        const average = recentData.reduce((sum, value) => sum + value, 0) / recentData.length;

        forecast.push(average);  // Add the forecasted value (moving average)
      }

      return forecast;
    } catch (error) {
      console.error('Error in forecastData:', error);
      throw new Error('Forecasting failed');
    }
  }
