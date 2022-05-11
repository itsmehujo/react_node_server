const { stripeSecretKey, stripeWebhookSecret } = require('../config/keys')
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

// In production, replace with Stripe hooks
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

exports.paymentSuccessHook = async (request, response) => {
  const sig = request.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, stripeWebhookSecret)
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('PaymentIntent was successful!')
      break
    case 'payment_method.attached':
      const paymentMethod = event.data.object
      console.log('PaymentMethod was attached to a Customer!')
      break
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true })
}