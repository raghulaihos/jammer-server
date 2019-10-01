const express = require('express');
const router = express.Router();
const jamcards_controller = require('../controllers/jamcards');
const is_auth = require('../middleware/is_auth');

router.get('/jamcards', is_auth, jamcards_controller.get_jamcards);

router.get('/test', jamcards_controller.test);

module.exports = router;

