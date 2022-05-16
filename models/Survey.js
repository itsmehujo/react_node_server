const mongoose = require('mongoose')
const { Schema } = mongoose
const RecipientSchema = require('./Recipient')

const SurveySchema = new Schema({
  _userL: {
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
  positiveFeedback: {
    type: Number,
    default: 0
  },
  negativeFeedback: {
    type: Number,
    default: 0
  },
  dateSent: Date,
  lastResponded: Date
})

mongoose.model('surveys', SurveySchema)