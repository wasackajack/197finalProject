/* eslint-disable linebreak-style */
const express = require('express')

const User = require('../models/user')

const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', (req, res) => {
  res.send('no username is entered')
})

router.get('/:username', (req, res) => {
  const { params: { username } } = req
  User.findOne({ username }, (err, user) => {
    if (user) {
      const { name } = user
      res.send(`this user has a username: ${username}`)
    } else {
      res.send(`the user with ${username} is not found`)
    }
  })
})

router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    await User.create({ username, password })
    res.send('user created succesfully')
  } catch {
    res.send(`failure occurs when creating the user ${username}`)
  }
})
// {"username":"william","password":"zhang"}
router.post('/login', (req, res) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user) => {
    if (user) {
      req.session.username = username
      req.session.password = password
      // console.log(req.session)
      res.send('logged in')
    } else {
      res.send('failed to log in')
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = ''
  res.send('user logged out')
})

module.exports = router
