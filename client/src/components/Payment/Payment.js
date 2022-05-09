import React, { useEffect, useState } from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
import axios from 'axios'
import {useSelector} from 'react-redux'
import '../../style/payment.scss'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
  const {tokens} = useSelector(state => state.cart)
  const [clientSecret, setClientSecret] = useState("")
  useEffect(() => {
    (async () => {
      const {status, data} = await axios.post('/api/payment/create-payment-intent', {tokens})
      status === 200 ? setClientSecret(data.clientSecret) : setClientSecret(false)
    })()
  }, [tokens])

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe'
    }
  }
  return(<main id='payment'>
    { clientSecret &&
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
      tokens={tokens}/>
    </Elements>}
  </main>)
}


export default Payment