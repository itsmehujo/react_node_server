const { stripeSecretKey } = require('../config/keys')
const stripe = require('stripe')(stripeSecretKey)

const getPriceForTokens = (tokens) => {
  switch (tokens) {
    case 10: return 10 * 100
    case 30: return 25 * 100
    case 100: return 75 * 100
    default: return 9999
  }
}
const getTokensForPrice = ({ amount }) => {
  switch (amount / 100) {
    case 10: return 10
    case 25: return 30
    case 75: return 100
    default: return 0
  }
}



exports.createPaymentIntent = async (req, res) => {
  const { tokens } = req.body
  const paymentIntent = await stripe.paymentIntents.create({
    amount: getPriceForTokens(tokens),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    }
  })
  res.send({
    clientSecret: paymentIntent.client_secret,
  })
}

exports.paymentSuccess = async (req, res) => {
  const { paymentIntent } = req.body
  if (paymentIntent.status === 'succeeded') {
    req.user.credits += getTokensForPrice(paymentIntent)
    const user = await req.user.save()
    res.send({
      paymentIntent,
      user
    })
  } else {
    res.send({
      status: 'fail'
    })
  }
}