import express from 'express'

const app = express()

// Routing
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' })
})

const PORT = process.env.PORT || 4020

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})
