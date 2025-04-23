import { isAxiosError } from 'axios'
import api from '../config/axios'
import { ProfileForm, type User } from '../types'

export async function getAuthUser() {
  try {
    const { data } = await api.get<User>('/auth/me')

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function updateUser(formData: ProfileForm) {
  try {
    const { data } = await api.patch<{ message: string }>(
      '/auth/user',
      formData
    )

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}
