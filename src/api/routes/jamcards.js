const express = require('express');
const router = express.Router();
const jamcards_controller = require('../controllers/jamcards');

router.get('/jamcards', jamcards_controller.get_jamcards);

router.get('/test', jamcards_controller.test);

module.exports = router;

