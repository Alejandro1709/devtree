import express from 'express'

const app = express()

// Routing
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' })
})

export default app
