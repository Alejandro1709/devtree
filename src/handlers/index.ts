import type { Request, Response } from 'express'
import User from '../models/User'

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      const error = new Error('This email is already in use')
      res.status(409).json({ message: error.message })
      return
    }

    const user = new User({ name, email, password })

    await user.save()

    res.status(201).json({ status: 'success', data: { user } })
  } catch (error) {
    res.status(500).json(error)
  }
}
