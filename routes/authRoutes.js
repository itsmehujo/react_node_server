const express = require('express')
const router = express.Router()
const passport = require('passport')

router
  .route('/google')
  .get(passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

router
  .route('/google/callback')
  .get(passport.authenticate('google'), (req, res) => { res.redirect('/surveys') })

module.exports = router