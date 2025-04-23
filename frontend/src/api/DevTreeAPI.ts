import { isAxiosError } from 'axios'
import api from '../config/axios'

export async function getAuthUser() {
  try {
    const { data } = await api.get('/auth/me')

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}
