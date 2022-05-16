const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

router
  .route('/google')
  .get(authController.loginGoogle)

router
  .route('/google/callback')
  .get(authController.authenticateLogin, authController.confirmLogin)

module.exports = router
