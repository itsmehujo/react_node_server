import {createSlice} from '@reduxjs/toolkit'

const surveysSlice = createSlice({
  name: 'surveys',
  initialState: {b: 1},
  reducers: {
    add: (state) => state.b+1
  }
})
export const { add } = surveysSlice.actions

export default surveysSlice.reducer


// Will handle the action type `'auth/login'`
