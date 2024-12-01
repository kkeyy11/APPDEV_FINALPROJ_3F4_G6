const firebaseModel = require('../models/firebaseModel');

module.exports = {
  async getForecast(req, res) {
    try {
      
      const data = await firebaseModel.fetchRealtimeData();

      
      if (!Array.isArray(data) || data.some(item => typeof item.voltage !== 'number' || typeof item.current !== 'number')) {
        throw new Error('Invalid data format. Each item must have numeric "voltage" and "current" properties.');
      }

      
      const voltage = data.map(item => item.voltage);
      const current = data.map(item => item.current);

      
      const voltageForecast = forecastData(voltage);
      const currentForecast = forecastData(current);

     
      res.render('index', { voltage, current, voltageForecast, currentForecast });
    } catch (error) {
      console.error('Error in getForecast:', error.message);
      res.status(500).send('Error fetching or forecasting data');
    }
  }
};


function forecastData(data) {
  try {
    const forecastLength = 3; 
    const movingAveragePeriod = 5; 

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Data must be a non-empty array of numbers.');
    }

    let forecast = [];
    for (let i = 0; i < forecastLength; i++) {
      const startIndex = Math.max(0, data.length - movingAveragePeriod);
      const recentData = data.slice(startIndex);
      const average = recentData.reduce((sum, value) => sum + value, 0) / recentData.length;

      forecast.push(average); 
      data.push(average); 
    }

    return forecast;
  } catch (error) {
    console.error('Error in forecastData:', error.message);
    throw new Error('Forecasting failed.');
  }
}
