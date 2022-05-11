const express = require('express')
const apiAuthController = require('../controllers/apiAuthController')
const router = express.Router()

router
  .route('/current_user')
  .get(apiAuthController.currentUser)

router
  .route('/logout')
  .get(apiAuthController.logout)

module.exports = router