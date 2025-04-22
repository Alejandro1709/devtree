import mongoose, { Schema } from 'mongoose'

export interface IUser {
  name: string
  email: string
  handle: string
  password: string
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  handle: {
    type: String,
    required: [true, 'A user must have a handle'],
    trim: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email address'],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [7, 'Please provide a password greater than 7 characters'],
  },
})

const User = mongoose.model<IUser>('User', userSchema)

export default User
