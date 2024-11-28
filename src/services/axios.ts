import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { cookie } from '@/utils/storage'
import { useAuthStore } from '@/stores/auth.store'
import * as configs from '@/constants/configs'

const Axios: AxiosInstance = axios.create({
  baseURL: `${configs.APP_API_GATEWAY}`,
  headers: {
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE',
  },
})

// Request interceptor: ตรวจสอบ access token และใส่ใน headers
Axios.interceptors.request.use(
  async (reqConfig) => {
    const authStore = useAuthStore()

    if (reqConfig.headers) {
      const accessToken = authStore.accessToken || cookie.get(configs.APP_AUTH_ACCESS)
      if (accessToken) {
        reqConfig.headers.Authorization = `Bearer ${accessToken}`
      }
    }

    return reqConfig
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor: รีเฟรช token ถ้าได้รับ 401 (Unauthorized)
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      // รีเฟรช session และรับ token ใหม่
      await authStore.refreshToken()

      // ใช้ access token ใหม่ใน headers และลองทำ request ใหม่
      originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`
      return axios(originalRequest)
    }

    return Promise.reject(error)
  },
)

export const { CancelToken } = axios
export default Axios
