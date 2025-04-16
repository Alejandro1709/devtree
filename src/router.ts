import { Router } from 'express'

const router = Router()

/** Authentication and Registration */
router.post('/register', (req, res) => {
  console.log('Desde Register')
})

export default router
