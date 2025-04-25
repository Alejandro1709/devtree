import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  handle: string
  description: string
  password: string
  image: string
  links: string
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
  description: {
    type: String,
    trim: true,
    default: '',
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
  image: {
    type: String,
    default: '',
  },
  links: {
    type: String,
    default: '[]',
  },
})

const User = mongoose.model<IUser>('User', userSchema)

export default User
