import { Router } from 'express'
import { body } from 'express-validator'
import {
  createAccount,
  getUser,
  getUserByHandle,
  login,
  searchByHandle,
  updateProfile,
  uploadImage,
} from './handlers'
import { handleInputErrors } from './middlewares/validation'
import { authenticate } from './middlewares/auth'

const router = Router()

/** Authentication and Registration */
router.post(
  '/auth/register',
  body('handle').notEmpty().withMessage('Handle is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid Email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password too short, minimum 7 chars'),
  handleInputErrors,
  createAccount
)

router.post(
  '/auth/login',
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleInputErrors,
  login
)

router.get('/user', authenticate, getUser)

router.patch(
  '/user',
  body('handle').notEmpty().withMessage('Handle is required'),
  handleInputErrors,
  authenticate,
  updateProfile
)

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

router.post(
  '/search',
  body('handle').notEmpty().withMessage('Handle is required'),
  handleInputErrors,
  searchByHandle
)

export default router
