import {createSlice} from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {
    title: '',
    subject: '',
    body: 'default body',
    recipients: [],
    email_template: 'basic'
  },
  reducers: {
    updateForm: (state, {payload}) => (
      {
        title: payload.title,
        subject: payload.subject,
        body: payload.body,
        recipients: payload.recipients,
        // For implementation of different templates later
        email_template: payload.email_template || state.email_template
      })
  },
  extraReducers: {}
})

export default formSlice.reducer
export const {updateForm} = formSlice.actions