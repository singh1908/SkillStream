const express = require('express');
const {addQuestion, getQuestions} = require("../Controllers/quizController");
const router = express.Router();

router.post('/add', addQuestion);
router.get('/attempt', getQuestions);

module.exports = router;