/* eslint-disable linebreak-style */
const { Schema, model } = require('mongoose')

const quizSchema = new Schema({
  //   name: String,
  title: { type: String, required: true },
  author: { type: String, required: true },
  questions: { type: [String] },
  choices: { type: [[String]] },
  answers: { type: [String] },
  scores: { type: [Number] },
})

module.exports = model('Quiz', quizSchema)
