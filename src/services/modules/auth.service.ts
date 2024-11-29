import { addDays } from 'date-fns'

import axios from '../axios'
import * as configs from '@/constants/configs'
import type { FormSignIn } from '@/types/Form'
import { cookie } from '@/utils/storage'

export class AuthService {
  static async signIn(formData: FormSignIn): Promise<any> {
    try {
      const data = {
        ...formData,
        expiresInMins: 30,
      }
      const response = await axios.post('/auth/login', data)

      if (response.data) {
        const { accessToken, refreshToken } = response.data

        cookie.set(configs.APP_AUTH_ACCESS, accessToken, {
          expires: addDays(new Date(), 1),
        })
        cookie.set(configs.APP_AUTH_REFRESH, refreshToken, {
          expires: addDays(new Date(), 1),
        })

        return response.data
      }
    } catch (error: any) {
      console.error('AuthService.signIn', error)
    }
  }

  static signOut(cb?: Function): void {
    cookie.remove(configs.APP_AUTH_ACCESS)
    cookie.remove(configs.APP_AUTH_REFRESH)

    localStorage.removeItem('user')
    if (cb) cb()
  }

  static async refreshToken(): Promise<any> {
    try {
      const refreshToken = cookie.get(configs.APP_AUTH_REFRESH)
      if (!refreshToken) {
        throw new Error('No refresh token found')
      }

      const body = {
        refreshToken: refreshToken,
        expiresInMins: 30,
      }

      const response = await axios.post('/auth/refresh', body)

      if (response.data) {
        const { accessToken, refreshToken } = response.data

        // Update the access token in cookies
        cookie.set(configs.APP_AUTH_ACCESS, accessToken, { expires: addDays(new Date(), 1) })
        cookie.set(configs.APP_AUTH_REFRESH, refreshToken, { expires: addDays(new Date(), 7) })

        return { accessToken, refreshToken }
      } else {
        throw new Error('Failed to refresh token')
      }
    } catch (error: any) {
      console.error('AuthService.refreshToken', error)
    }
  }

  static async me(): Promise<any> {
    try {
      const response = await axios.get('/auth/me')

      if (response.data) {
        return response.data
      }
    } catch (error: any) {
      console.error('AuthService.me', error)
    }
  }
}
