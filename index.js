const express = require('express')

const app = express()

// Routing
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' })
})

app.listen(4020, () => {
  console.log('Server is up and running on port 4020')
})
