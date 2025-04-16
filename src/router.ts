import { Router } from 'express'

const router = Router()

/** Authentication and Registration */
router.post('/register', (req, res) => {
  console.log(req.body)
  res.status(201).json({ message: 'OK' })
})

export default router
