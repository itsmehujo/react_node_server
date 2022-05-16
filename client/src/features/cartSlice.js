import {createSlice} from '@reduxjs/toolkit'


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    name:"standard",
    tokens:10,
    price:10
  },
  reducers: {
    updateCart: (state, {payload}) => (
      {
        name: payload.chosenPackage.name,
        tokens: payload.chosenPackage.tokens, 
        price: payload.chosenPackage.price
      })
  },
  extraReducers: {}
})

export default cartSlice.reducer
export const {updateCart} = cartSlice.actions