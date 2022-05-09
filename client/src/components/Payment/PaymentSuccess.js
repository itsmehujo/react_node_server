import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useStripe} from '@stripe/react-stripe-js'
import axios from 'axios'

const PaymentSuccess = ({clientSecret}) => {
  const stripe = useStripe()
  const profile = useSelector(state => state.auth)

  useEffect(() => {
    if(!stripe) {
      return
    }
    (async() => {
      const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret)
      const body = {
        paymentIntent,
        profile: profile
      }
      const {data} = await axios.post('/api/payment/success', body)
      console.log(data)
    })()
  }, [stripe, profile])

  return null
}

export default PaymentSuccess