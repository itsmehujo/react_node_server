import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUser = createAsyncThunk('auth/fetchUser', async (thunkApi) => {
    const {data, status} = await axios.get('/api/current_user')
    return status === 200 ? data : false
})


const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: state => null,
    [fetchUser.fulfilled]: (state, {payload}) => payload || false,
    [fetchUser.rejected]: (state, {payload}) => {
      state = false
      console.log(payload)
    }
  }
})

export const {login} = authSlice.actions

export default authSlice.reducer


// Will handle the action type `'auth/login'`
