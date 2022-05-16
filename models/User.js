const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleID: {
    type: String,
    unique: true
  },
  lastPaymentIntent: {
    type: String
  },
  credits: {
    type: Number,
    default: 0
  }
})

mongoose.model('users', userSchema)``