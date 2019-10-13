const express = require('express');
const router = express.Router();
const search_controller = require('../controllers/search');
const is_auth = require('../middleware/is_auth');

router.get('/search', is_auth, search_controller.search_all_cards);
router.get('/room_details', is_auth, search_controller.jamroom_details);


module.exports = router;

