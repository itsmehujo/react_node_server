const express = require('express')
const paymentController = require('../controllers/paymentController')
const requireLogin = require('../middlewares/requireLogin')
const router = express.Router()

router.use(requireLogin)

router
  .route('/create-payment-intent')
  .post(paymentController.createPaymentIntent)

router
  .route('/success')
  .post(paymentController.paymentSuccess)

module.exports = router