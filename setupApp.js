const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')
const { cookieKeys } = require('./config/keys')
const app = express()

// MIDDLEWARES
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [...cookieKeys.split(' ')]
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

module.exports = app
