import { isAxiosError } from 'axios'
import api from '../config/axios'
import type { LoginForm, RegisterForm, User, UserHandle } from '../types'

export async function login({ email, password }: LoginForm) {
  try {
    const { data } = await api.post('/auth/login', { email, password })

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function signup({
  name,
  handle,
  email,
  password,
  password_confirmation,
}: RegisterForm) {
  try {
    const { data } = await api.post('/auth/register', {
      name,
      handle,
      email,
      password,
      password_confirmation,
    })

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function getAuthUser() {
  try {
    const { data } = await api.get<User>('/user')

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function updateUser(formData: User) {
  try {
    const { data } = await api.patch<{ message: string }>('/user', formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function uploadImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const { data } = await api.post('/user/image', formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function getUserByHandle(handle: string) {
  try {
    const { data } = await api.get<UserHandle>(`/${handle}`)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function searchByHandle(handle: string) {
  try {
    const { data } = await api.post<{ message: string }>('/search', { handle })

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}
