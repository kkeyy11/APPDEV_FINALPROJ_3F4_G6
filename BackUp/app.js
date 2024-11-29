const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/sensorRoutes');  // Adjusting route import based on provided structure
const app = express();

// Middleware and settings
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Start the server
app.listen(8080, () => {
    console.log('Server initialized on http://localhost:8080');
});
