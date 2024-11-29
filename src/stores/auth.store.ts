import { addDays } from 'date-fns'
import { defineStore } from 'pinia'

import * as configs from '@/constants/configs'
import { AuthService } from '@/services'
import type { FormSignIn } from '@/types/Form'
import { cookie } from '@/utils/storage'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: cookie.get(configs.APP_AUTH_ACCESS) || '',
    refreshToken: cookie.get(configs.APP_AUTH_REFRESH) || '',
    user: JSON.parse(localStorage.getItem('user') || 'null') || null,
  }),
  actions: {
    async signIn(data: FormSignIn) {
      const response = await AuthService.signIn(data)
      if (response) {
        this.accessToken = response.accessToken
        this.refreshToken = response.refreshToken

        cookie.set(configs.APP_AUTH_ACCESS, response.accessToken, {
          expires: addDays(new Date(), 1),
        })
        cookie.set(configs.APP_AUTH_REFRESH, response.refreshToken, {
          expires: addDays(new Date(), 7),
        })

        const resProfile = await AuthService.me()

        if (resProfile) {
          this.user = resProfile
          localStorage.setItem('user', JSON.stringify(resProfile))
        }

        return true
      }
    },
    async getProfile() {
      const response = await AuthService.me()

      if (response) {
        this.user = response
        localStorage.setItem('user', JSON.stringify(response))
      }
    },
    async refreshToken() {
      const response = await AuthService.refreshToken()

      if (response) {
        this.accessToken = response.accessToken
        this.refreshToken = response.refreshToken

        cookie.set(configs.APP_AUTH_ACCESS, response.accessToken, {
          expires: addDays(new Date(), 1),
        })
        cookie.set(configs.APP_AUTH_REFRESH, response.refreshToken, {
          expires: addDays(new Date(), 7),
        })

        return true
      }
    },
  },
})
