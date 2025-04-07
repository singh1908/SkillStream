const express = require('express');
const router = express.Router();
const { chatBotHandler } = require('../Controllers/chatController');

router.post('/', chatBotHandler);

module.exports = router;
