import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPayment = createAsyncThunk('stripe/fetchPayment', async (thunkApi) => {
    const {data, status} = await axios.post('/payment/create-payment-intent',{item: {price: 500}}, {headers: {'Content-Type': 'Application/JSON'}})
    return status === 200 ? data : false
})


const paymentSlice = createSlice({
  name: 'stripe',
  initialState: {},
  reducers: {},
  extraReducers: {
    [fetchPayment.pending]: state => null,
    [fetchPayment.fulfilled]: (state, {payload}) => payload || false,
    [fetchPayment.rejected]: (state, {payload}) => {
      state = false
      console.log(payload)
    }
  }
})


export default paymentSlice.reducer


