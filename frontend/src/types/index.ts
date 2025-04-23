export type User = {
  _id: string
  name: string
  handle: string
  email: string
  description: string
}

export type RegisterForm = Pick<User, 'handle' | 'email' | 'name'> & {
  password: string
  password_confirmation: string
}

export type LoginForm = Pick<User, 'email'> & {
  password: string
}
