const { stripeSecretKey } = require('../config/keys')
const stripe = require('stripe')(stripeSecretKey)

module.exports = (app) => {
  app.post("/api/payment/create-payment-intent", async (req, res) => {
    const { tokens } = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000 * tokens,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      }
    })
    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  })
  app.post('/api/payment/success', async (req, res) => {
    const { paymentIntent, profile } = req.body
    if (paymentIntent.status === 'succeeded' && profile) {
      res.send({
        paymentIntent,
        profile
      })
    } else {
      res.send({
        status: 'fail'
      })
    }
  })
}