const mongoose = require('mongoose')
const { Schema } = mongoose
const RecipientSchema = require('./Recipient')

const SurveySchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    required: true,
    type: String
  },
  subject: {
    required: true,
    type: String
  },
  body: {
    required: true,
    type: String
  },
  recipients: {
    type: [RecipientSchema]
  },
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  dateSent: Date,
  lastResponded: Date
})

mongoose.model('surveys', SurveySchema)