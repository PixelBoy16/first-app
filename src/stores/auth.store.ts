import { addDays } from 'date-fns'
import { defineStore } from 'pinia'

import * as configs from '@/constants/configs'
import { AuthService } from '@/services'
import type { FormSignIn } from '@/types/Form'
import { cookie } from '@/utils/storage'
import type { SchemaUser } from '@/types/Schema'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: cookie.get(configs.APP_AUTH_ACCESS) || '',
    refreshToken: cookie.get(configs.APP_AUTH_REFRESH) || '',
    user: null as any,
  }),
  actions: {
    async signIn(data: FormSignIn) {
      const response = await AuthService.signIn(data)
      if (response) {
        this.accessToken = response.accessToken
        this.refreshToken = response.refreshToken
        this.user = {
          id: response.id,
          image: response.image,
          gender: response.gender,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          username: response.username,
        } as SchemaUser

        cookie.set(configs.APP_AUTH_ACCESS, response.accessToken, {
          expires: addDays(new Date(), 1),
        })
        cookie.set(configs.APP_AUTH_REFRESH, response.refreshToken, {
          expires: addDays(new Date(), 7),
        })

        return true
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
      }
    },
  },
})
