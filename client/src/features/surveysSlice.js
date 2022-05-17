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
    [fetchSurveys.pending]: state => [],
    [fetchSurveys.fulfilled]: (state, {payload}) => payload || [],
    [fetchSurveys.rejected]: (state, {payload}) => []
    
  }
})

export const {login} = surveysSlice.actions

export default surveysSlice.reducer


// Will handle the action type `'auth/login'`
