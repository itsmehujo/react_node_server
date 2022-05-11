import {useEffect} from 'react'
import {useStripe} from '@stripe/react-stripe-js'
import axios from 'axios'

const PaymentSuccess = ({clientSecret}) => {
  const stripe = useStripe()

  useEffect(() => {
    if(!stripe) {
      return
    }
    (async() => {
      const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret)
      const body = {
        paymentIntent
      }
      const {data} = await axios.post('/api/payment/success', body)
      console.log(data)
    })()
  }, [stripe])

  return null
}

export default PaymentSuccess