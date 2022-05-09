import React from 'react'
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('')


const CheckoutForm = () => {
  const options = {
    clientSecret: '{{CLIENT_SECRET}}'
  }
  return(<>
    <Elements stripe={stripePromise} options={options}>
      <form>
        <PaymentElement/>
        <button>Submit</button>
      </form>
    </Elements>
  </>)
}

export default CheckoutForm