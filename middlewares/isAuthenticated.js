/* eslint-disable linebreak-style */
const express = require('express')

const router = express.Router()

const isAuthenticated = (req, res, next) => {
  if (req.session.username && req.session.username !== '') {
    next()
  } else {
    next(new Error('user is not logged in'))
  }
}

module.exports = isAuthenticated
