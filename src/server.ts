import express from 'express'
import router from './router'
import 'dotenv/config'
import { connectDB } from './config/db'

const app = express()

connectDB(process.env.MONGO_URI)

app.use(express.json())

app.use('/auth', router)

export default app
