import User, { type IUser } from '../models/User'
import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    const error = new Error('Not authorized')
    res.status(401).json({ message: error.message })
    return
  }

  const [, token] = bearer.split(' ')

  if (!token) {
    const error = new Error('Not authorized')
    res.status(401).json({ message: error.message })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof decoded === 'object' && decoded.id) {
      const user = await User.findById(decoded.id).select('-password')

      if (!user) {
        const error = new Error('This user does not exists')
        res.status(404).json({ message: error.message })
        return
      }

      req.user = user

      next()
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid Token' })
  }
}
