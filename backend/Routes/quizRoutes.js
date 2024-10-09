const express = require('express');
const router = express.Router();
const Question = require('../Models/questionModel');

router.post('/add-quiz', async (req, res) => {
  const { subject, questions } = req.body;
  const newQuiz = new Question({ subject, questions });
  await newQuiz.save();
  res.send('Quiz added successfully');
});

router.get('/quizzes', async (req, res) => {
  const quizzes = await Question.find();
  res.json(quizzes);
});

router.get('/quizzes/:id', async (req, res) => {
    try {
      const quiz = await Question.findById(req.params.id);
      res.json(quiz);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
