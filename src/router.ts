import { Router } from 'express'
import { createAccount } from './handlers'

const router = Router()

/** Authentication and Registration */
router.post('/register', createAccount)

export default router
