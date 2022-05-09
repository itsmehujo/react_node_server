import {createSlice} from '@reduxjs/toolkit'


const cartSlice = createSlice({
  name: 'cart',
  initialState: {tokens: 1},
  reducers: {
    updateCart: (state, {payload}) => state.item = payload
  },
  extraReducers: {}
})

export default cartSlice.reducer