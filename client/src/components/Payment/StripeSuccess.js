import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import PaymentSuccess from './PaymentSuccess'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const StripeSuccess = () => {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  const options = {
    clientSecret
  }
  return(<main id='payment_success'>
    { clientSecret &&
    <Elements stripe={stripePromise} options={options}>
      <PaymentSuccess clientSecret={clientSecret}/>
    </Elements>}
  </main>)
}
export default StripeSuccess;