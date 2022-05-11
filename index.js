const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const { mongoURI, cookieKeys } = require('./config/keys')
require('./models/User')
require('./services/passport')
const authRouter = require('./routes/authRoutes')
const apiAuthRouter = require('./routes/apiAuthRoutes')
const paymentRouter = require('./routes/paymentRoutes')

mongoose.connect(mongoURI)
  .catch((e) => console.error(e))

const app = express()

// MIDDLEWARES
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [...cookieKeys.split(' ')]
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())


app.use('/auth/google', authRouter)
app.use('/api/user', apiAuthRouter)
app.use('/api/payment', paymentRouter)


const PORT = process.env.PORT || 5050
app.listen(PORT)