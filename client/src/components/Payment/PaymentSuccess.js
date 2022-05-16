import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {useStripe} from '@stripe/react-stripe-js'
import axios from 'axios'

import { fetchUser } from '../../features/authSlice'

const PaymentSuccess = ({clientSecret}) => {
  const stripe = useStripe()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!stripe) {
      return
    }
    (async() => {
      const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret)
      const {data} = await axios.post('/api/payment/success', paymentIntent)
      dispatch(fetchUser())
    })()
  }, [stripe])

  return null
}

export default PaymentSuccess