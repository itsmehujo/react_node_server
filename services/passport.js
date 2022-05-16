const { googleClientID, googleClientSecret } = require('../config/keys')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const passport = require('passport')
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
    callbackURL: '/api/auth/google/callback',
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleID: profile.id })
    if (!user) user = await new User({ googleID: profile.id }).save()
    done(null, user)
  })
)
