import React, { useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { fetchPayment } from '../features/paymentSlice'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)


const CheckoutForm = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPayment())
  }, [dispatch])

  const options = {
    clientSecret: '{{CLIENT_SECRET}}',
    appearance: {
      theme: 'stripe'
    }
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