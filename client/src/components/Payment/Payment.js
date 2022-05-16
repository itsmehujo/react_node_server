import React, { useEffect, useState } from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {useSelector} from 'react-redux'
import axios from 'axios'

import CheckoutForm from './CheckoutForm'

import './style/payment.scss'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
  const cart = useSelector(state => state.cart)
  const profile = useSelector(state => state.auth)
  const [clientSecret, setClientSecret] = useState("")
  useEffect(() => {
    (async () => {
      const {status, data} = await axios.post('/api/payment/create-payment-intent', cart)
      status === 200 ? setClientSecret(data.clientSecret) : setClientSecret(false)
    })()
  }, cart)

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe'
    }
  }
  return( profile && 
  <main id='payment'>
    <span>You chose the {cart.name} package with {cart.tokens} tokens</span>
    { clientSecret &&
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
      price={cart.price}/>
    </Elements>}
  </main>)
}


export default Payment