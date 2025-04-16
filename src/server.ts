import express from 'express'
import router from './router'

const app = express()

app.use(express.json())

app.use('/auth', router)

export default app
