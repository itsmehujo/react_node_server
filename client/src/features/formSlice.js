import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  title: '',
  subject: '',
  body: '',
  recipients: [],
  email_template: 'basic'
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, {payload}) => (
      {
        title: payload.title,
        subject: payload.subject,
        body: payload.body,
        recipients: payload.recipients,
        // For implementation of different templates later
        email_template: payload.email_template || state.email_template
      }),
    resetForm: state => initialState
  },
  extraReducers: {}
})

export default formSlice.reducer
export const {updateForm, resetForm} = formSlice.actions