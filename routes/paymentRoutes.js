const { stripeSecretKey } = require('./config/keys')
const stripe = require('stripe')(stripeSecretKey)

module.exports = (app) => {
  app.post("/create-payment-intent", async (req, res) => {
    const { item } = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      amount: item.price,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    })
    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  })
}