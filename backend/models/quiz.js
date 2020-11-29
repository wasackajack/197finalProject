/* eslint-disable linebreak-style */
const { Schema, model } = require("mongoose");
// const Question = require('./question')
// var QuestionSchema = require('./question').QuestionSchema;

// const question = {question, answer}

const quizSchema = new Schema({
  //   name: String,
  title: { type: String, required: true },
  author: { type: String, required: true },
  questions: { type: [String] },
  choices: { type: [[String]] },
  answers: { type: [String] },
  scores: { type: [Number] },

  //   created_at: Date,
  //   updated_at: Date,
});

module.exports = model("Quiz", quizSchema);
