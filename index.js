const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const { mongoURI, cookieKeys } = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(mongoURI)
const app = express()

// MIDDLEWARES
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [...cookieKeys.split(' ')]
}))

app.use(passport.initialize())
app.use(passport.session())


require('./routes/authRoutes')(app)


const PORT = process.env.PORT || 5050
app.listen(PORT)