import express from 'express'
import cors from 'cors'
import router from './router'
import 'dotenv/config'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

const app = express()

connectDB(process.env.MONGO_URI)

app.use(express.json())
app.use(cors(corsConfig))

app.use('/', router)

export default app
