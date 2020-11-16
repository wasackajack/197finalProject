/* eslint-disable linebreak-style */
const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

// for finding all questons
router.get('/questions', (req, res) => {
  Question.find({}, (err, allQuestions) => {
    if (allQuestions) {
      res.send(allQuestions)
    } else {
      res.send('failed getting all questions')
    }
  })
})

// for adding a question
router.post('/questions/add', isAuthenticated, async (req, res) => {
  const { questionText, author } = req.body

  try {
    await Question.create({ questionText, author })
    res.send('question created succesfully')
  } catch {
    res.send('failure occurs when creating the question')
  }
})

// for answering a question
router.post('/questions/answer', isAuthenticated, async (req, res) => {
  const { _id, answer } = req.body
  try {
    await Question.findOneAndUpdate({ _id }, { answer }, { useFindAndModify: false })
    res.send('question answered successfully')
  } catch (error) {
    // console.log(error)
    res.send(`failure occurs when answering the question ${answer}`)
  }
})
// {"_id": {"ObjectId":"5fa1b6911dead842c4e81f24"}, "author":"changed"}

module.exports = router
