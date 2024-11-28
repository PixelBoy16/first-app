import Cookies from 'universal-cookie'
import type { CookieSetOptions } from 'universal-cookie'

/**
 * Cookies Manager.
 */
export class cookie {
  static get<R = any>(name: string, json?: 0 | 1): R | void {
    const results = new Cookies().get(name)
    return json && results ? JSON.parse(results) : results
  }

  static set(name: string, value: string | object, options?: CookieSetOptions) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    return new Cookies().set(name, value, this.options(options))
  }

  static remove(name: string, options?: CookieSetOptions) {
    return new Cookies().remove(name, this.options(options))
  }

  static options(options?: CookieSetOptions): CookieSetOptions {
    return {
      domain: location.hostname,
      path: '/',
      sameSite: 'strict',
      // secure: true,
      ...options,
    }
  }
}
