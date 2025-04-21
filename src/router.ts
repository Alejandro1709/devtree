import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, login } from './handlers'

const router = Router()

/** Authentication and Registration */
router.post(
  '/register',
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('handle').notEmpty().withMessage('Handle cannot be empty'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 7 })
    .withMessage('Please provide a password greater than 7 characters'),
  createAccount
)

router.post(
  '/login',
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Please provide a password'),
  login
)

export default router
