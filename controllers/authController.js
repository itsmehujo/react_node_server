const passport = require('passport')

exports.authenticateLogin = (req, res, next) => {
  passport.authenticate('google')
  next()
}

exports.loginGoogle = (req, res) => {
  console.log('login with google')
  passport.authenticate('google')
}

exports.confirmLogin = (req, res) => res.redirect('/surveys')