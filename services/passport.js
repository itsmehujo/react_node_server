const { googleClientID, googleClientSecret } = require('../config/keys')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const { googleCallbackURI } = require('../config/keys')
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id }).then(user => {
      if (user) {
        done(null, user)
      } else {
        newUser = new User({ googleID: profile.id }).save().then(user => done(null, user))
      }
    })
  })
)