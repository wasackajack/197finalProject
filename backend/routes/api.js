/* eslint-disable linebreak-style */
const express = require('express')

const router = express.Router()

// const User = require('../models/user')
// const Question = require('../models/question')
const Quiz = require('../models/quiz')
const isAuthenticated = require('../middlewares/isAuthenticated')

// for finding all quizzes (used for the search bar)
router.get('/quizzes', (req, res) => {
  Quiz.find({}, (err, allQuizzes) => {
    if (allQuizzes) {
      res.send(allQuizzes)
    } else {
      res.send('failed getting all quizzes')
    }
  })
})

// for finding a specific quiz with the id (may be an array, not too sure)
// {"_id":"5fbc99447668260ed0926e40"}
router.get('/findquiz', (req, res) => {
  const { _id } = req.body
  Quiz.find({ _id }, (err, quiz) => {
    if (quiz) {
      res.send(quiz)
    } else {
      res.send('quiz does not exist')
    }
  })
})

// for adding a quiz
//  {"title":"samplequiz", "author":"user", "questions":["q1","q2"],
// "choices":[["a","b","c","d"],["a","b","c","d"]],"answers":["a","b"]}
router.post('/quiz/add', isAuthenticated, async (req, res) => {
  const {
    title, author, questions, choices, answers,
  } = req.body

  try {
    await Quiz.create({
      title, author, questions, choices, answers,
    })
    res.send('quiz created succesfully')
  } catch {
    res.send('failure occurs when creating the quiz')
  }
})

// for adding a score to a quiz
// {"_id":"5fbed43e1e5c6c356cf93be9", "score": 3}
router.post('/quiz/addscore', isAuthenticated, async (req, res) => {
  const { _id, score } = req.body
  try {
    await Quiz.findOneAndUpdate({ _id }, { $push: { scores: score } })
    res.send('score added successfully')
  } catch (error) {
    // console.log(error)
    res.send('failure occurs when adding the new score')
  }
})

// for getting the scores to a quiz
// {"_id":"5fbed43e1e5c6c356cf93be9"}
router.get('/quiz/getscores', (req, res) => {
  const { _id } = req.body
  Quiz.find({ _id }, (err, quiz) => {
    if (quiz) {
      const { scores } = quiz[0]
      res.send(scores)
    } else {
      // console.log(err)
      res.send('quiz does not exist')
    }
  })
})

// for getting the array of questions from a quiz
router.get('/quiz/getquestions', (req, res) => {
  const { _id } = req.body
  Quiz.find({ _id }, (err, quiz) => {
    if (quiz) {
      const { questions } = quiz[0]
      res.send(questions)
    } else {
      // console.log(err)
      res.send('quiz does not exist')
    }
  })
})

// for getting the array of choices from a quiz
router.get('/quiz/getchoices', (req, res) => {
  const { _id } = req.body
  Quiz.find({ _id }, (err, quiz) => {
    if (quiz) {
      const { choices } = quiz[0]
      res.send(choices)
    } else {
      // console.log(err)
      res.send('quiz does not exist')
    }
  })
})

// for getting the correct answer array from a quiz
router.get('/quiz/getanswers', (req, res) => {
  const { _id } = req.body
  Quiz.find({ _id }, (err, quiz) => {
    if (quiz) {
      const { answers } = quiz[0]
      res.send(answers)
    } else {
      // console.log(err)
      res.send('quiz does not exist')
    }
  })
})

module.exports = router
