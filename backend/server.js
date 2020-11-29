/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')


const ApiRouter = require('./routes/api')
const AccountRouter = require('./routes/account')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/final'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))
app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)



// error handler
// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  //console.log(err)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.send('Error')
}
// use the errorhandler
app.use(errorHandler)

app.use('/api', ApiRouter)
app.use('/account', AccountRouter)

app.get('/favicon.ico', (_, res) => res.status(404).send())
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  // console.log('listening on 3000')
})
