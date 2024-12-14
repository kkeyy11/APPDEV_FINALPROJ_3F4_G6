const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");  

const app = express();

// Middleware
app.use(cors());    
app.use(bodyParser.json());


app.use(express.static('public'));

// Set EJS as the templating engine
app.set("view engine", "ejs");


// Use Routes
app.use("/", routes);
app.use("/api/sensordata", routes);

// Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
