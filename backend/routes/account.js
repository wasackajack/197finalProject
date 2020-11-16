/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const express = require("express")

const User = require("../models/user")

const router = express.Router()
const isAuthenticated = require("../middlewares/isAuthenticated")

router.get("/", (req, res) => {
  res.send("no username is entered")
})

// see if user is currently logged in
router.get("/isloggedin", (req, res) => {
  if (req.session.username && req.session.username !== "") {
    res.send(true)
  } else {
    res.send(false)
  }
})

router.get("/getusername", (req, res) => {
  res.send(req.session.username)
})

router.post("/signup", async (req, res) => {
  const { username, password } = req.body

  try {
    await User.create({ username, password })
    res.send("user created succesfully")
  } catch {
    res.send(`failure occurs when creating the user ${username}`)
  }
})
// {"username":"william","password":"zhang"}
router.post("/login", (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user) => {
    if (user) {
      req.session.username = username
      req.session.password = password
      // console.log(req.session)
      res.send("logged in")
    } else {
      const error = new Error("Error on login")
      next(error)
    }
  })
})

router.post("/logout", isAuthenticated, (req, res) => {
  req.session.username = ""
  res.send("user logged out")
})

module.exports = router
