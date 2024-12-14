const express = require("express");
const router = express.Router();
const realTimeController = require("../controllers/realTimeController");

router.post('/', realTimeController.createSensorData)
router.get("/", realTimeController.getSensorDatas);
router.get("/:id", realTimeController.getSensorData);
router.put("/:id", realTimeController.updateSensorData);
router.delete("/:id", realTimeController.deleteSensorData);


// API route to fetch real-time data


module.exports = router;
