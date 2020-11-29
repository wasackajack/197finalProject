/* eslint-disable linebreak-style */
const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
//   name: String,
  questionText: { type: String, required: true },
  answerChoices: { type: [String], required: true },
  answer: { type: String, required: true },
})

exports.Question = model('Question', questionSchema)
//export const Question = mongoose.model('Question', questionSchema);
exports.questionSchema = questionSchema;
