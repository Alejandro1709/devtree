import type { Request, Response } from 'express'
import slugify from 'slugify'
import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, handle, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      const error = new Error('This email is already in use')
      res.status(409).json({ message: error.message })
      return
    }

    const userHandle = slugify(handle, '')

    const handleExists = await User.findOne({ handle: userHandle })

    if (handleExists) {
      const error = new Error('This handle is already in use')
      res.status(409).json({ message: error.message })
      return
    }

    const hash = await hashPassword(password)

    const user = new User({ name, handle: userHandle, email, password: hash })

    await user.save()

    res.status(201).json({ status: 'success', data: { user } })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  let { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    const error = new Error('This user does not exists')
    res.status(404).json({ message: error.message })
    return
  }

  const isPasswordCorrect = await checkPassword(password, user.password)

  if (!isPasswordCorrect) {
    const error = new Error('Invalid Credentials')
    res.status(401).json({ message: error.message })
    return
  }

  const token = generateJWT({ id: user._id })

  res.status(200).json({ status: 'success', token })
}

export const getAuthUser = async (req: Request, res: Response) => {
  res.status(200).json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description } = req.body

    const userHandle = slugify(req.body.handle, '')

    const handleExists = await User.findOne({ handle: userHandle })

    if (handleExists && handleExists.email !== req.user.email) {
      const error = new Error('This handle is already in use')
      res.status(409).json({ message: error.message })
      return
    }

    // Actualizar el usuario
    req.user.description = description
    req.user.handle = userHandle

    await req.user.save()

    res.status(200).json({ message: 'Profile Updated!' })
  } catch (error) {
    const err = new Error('Some error happened!')
    res.status(500).json({ message: err.message })
    return
  }
}
