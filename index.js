const app = require('./globalMiddlewares')
require('./database')
require('./services/passport')


app.use('/auth/google', require('./routes/authRoutes'))
app.use('/api/user', require('./routes/apiAuthRoutes'))
app.use('/api/payment', require('./routes/paymentRoutes'))


const PORT = process.env.PORT || 5050
app.listen(PORT)