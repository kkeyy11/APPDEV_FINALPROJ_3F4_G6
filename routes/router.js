const express = require('express');
const router = express.Router();
const kmy = require('../controller/KmyController');


router.get('/', kmy.index);



module.exports = router;