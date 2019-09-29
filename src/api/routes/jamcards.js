const express = require('express');
const router = express.Router();
const jamcards_controller = require('../controllers/jamcards');

router.get('/jamcards', jamcards_controller.get_jamcards);

module.exports = router;

