const passport = require('passport')

exports.authenticateLogin = (req, res, next) => {
  passport.authenticate('google')
  next()
}

exports.loginGoogle = () => passport.authenticate('google', { scope: ['profile', 'email'] })

exports.confirmLogin = (req, res) => res.redirect('/surveys')