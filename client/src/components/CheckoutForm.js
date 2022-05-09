import React from 'react'
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)


const CheckoutForm = () => {
  const options = {
    clientSecret: '{{CLIENT_SECRET}}'
  }
  return(<main>
    <Elements stripe={stripePromise} options={options}>
      <form>
        <PaymentElement/>
        <button>Submit</button>
      </form>
    </Elements>
  </main>)
}

export default CheckoutForm