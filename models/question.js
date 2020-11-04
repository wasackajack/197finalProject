/* eslint-disable linebreak-style */
const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
//   name: String,
  questionText: { type: String, required: true },
  answer: { type: String },
  author: { type: String, required: true },
//   created_at: Date,
//   updated_at: Date,
})

module.exports = model('Question', questionSchema)
