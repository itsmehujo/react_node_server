const mongoose = require('mongoose')
const { mongoURI } = require('./config/keys')
require('./models/User')
require('./models/Survey')

mongoose.connect(mongoURI)
  .catch((e) => console.error(e))