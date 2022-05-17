import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSurveys = createAsyncThunk('surveys/fetchSurveys', async (thunkApi) => {
    const {data, status} = await axios.get('/api/surveys')
    return status === 200 ? data : false
})


const surveysSlice = createSlice({
  name: 'surveys',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchSurveys.pending]: state => null,
    [fetchSurveys.fulfilled]: (state, {payload}) => payload || false,
    [fetchSurveys.rejected]: (state, {payload}) => {
      state = false
    }
  }
})

export const {login} = surveysSlice.actions

export default surveysSlice.reducer


// Will handle the action type `'auth/login'`
