const express = require('express')
const app = express()
const PORT = process.env.PORT || 5050

app.get('/', (req, res) => {
  res.status(200).send({
    hi: 'there'
  })
})

app.listen(PORT)