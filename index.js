const app = require('./setupApp')
const passport = require('passport')
require('./database')
require('./services/passport')


app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/user', require('./routes/apiAuthRoutes'))
app.use('/api/payment', require('./routes/paymentRoutes'))
app.use('/api/surveys', require('./routes/surveyRoutes'))



if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5050
app.listen(PORT)