/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')

const ApiRouter = require('./routes/api')
const AccountRouter = require('./routes/account')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hw6'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use('/api', ApiRouter)
app.use('/account', AccountRouter)

// error handler
// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.send('Error')
}
// use the errorhandler
app.use(errorHandler)

app.listen(3000, () => {
  // console.log('listening on 3000')
})
