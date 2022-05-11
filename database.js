const mongoose = require('mongoose')
const { mongoURI } = require('./config/keys')
require('./models/User')

mongoose.connect(mongoURI)
  .catch((e) => console.error(e))