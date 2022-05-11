const express = require('express')
const paymentController = require('../controllers/paymentController')
const requireLogin = require('../middlewares/requireLogin')
const router = express.Router()

router.use(requireLogin)

router
  .route('/create-payment-intent')
  .post(paymentController.createPaymentIntent)

// Disable in production, use webhook
router
  .route('/success')
  .post(paymentController.paymentSuccess)

router
  .route('/webhook')
  .post(express.raw({ type: 'application/json' }), paymentController.paymentSuccessHook)
  .get((req, res) => res.send({ good: 'address' }))

module.exports = router