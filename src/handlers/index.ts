import type { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      const error = new Error('This email is already in use')
      res.status(409).json({ message: error.message })
      return
    }

    const hash = await hashPassword(password)

    const user = new User({ name, email, password: hash })

    await user.save()

    res.status(201).json({ status: 'success', data: { user } })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
