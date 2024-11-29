// app.js
const express = require('express');
const app = express();
const forecastController = require('./controllers/forecastController');
const path = require('path');

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware (for handling form submissions if needed)
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/', forecastController.getForecast);  // Main route that triggers forecast

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
