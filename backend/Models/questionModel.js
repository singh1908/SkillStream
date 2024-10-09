const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: String,
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    },
  ],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
