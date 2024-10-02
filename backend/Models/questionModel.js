const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: Number, required: true }, // Index of the correct option
});

module.exports = mongoose.model('Question', questionSchema);