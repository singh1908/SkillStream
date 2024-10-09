// const Question = require("../Models/questionModel");

// // Add new question
// const addQuestion = async (req, res) => {
//     const { question, options, answer } = req.body;
    
//     try {
//       const newQuestion = new Question({ question, options, answer });
//       await newQuestion.save();
//       res.status(201).json({ message: 'Question added successfully!' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to add question.' });
//     }
//   };
  
//   // Get all questions
//   const getQuestions = async (req, res) => {
//     try {
//       const questions = await Question.find();
//       res.status(200).json(questions);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch questions.' });
//     }
//   };
  
//   module.exports = { addQuestion, getQuestions };