const { googleClientID, googleClientSecret } = require('../config/keys')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: `/auth/google/callback`
  }, (profile, done) => {
    console.log('profile ', profile)
  })
)