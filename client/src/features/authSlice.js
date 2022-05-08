import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUser = createAsyncThunk('auth/fetchUser', async (thunkApi) => {
  try {
    const {data} = await axios.get('/api/current_user')
    return data
  } catch (e) {
    return e
  }
})


const authSlice = createSlice({
  name: 'auth',
  initialState: {profile: {}},
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled]: (state, {payload}) => {
      state.profile = payload
    },
    [fetchUser.rejected]: (state, {payload}) => {
      state.error = payload
    }
  }
})

export const {login} = authSlice.actions

export default authSlice.reducer


// Will handle the action type `'auth/login'`
