import type { LoginByPhone, LoginByUser } from '@/typings/api'
import request from '@/utils/request'

export function loginByUser({ username, password }: LoginByUser) {
  return request({
    url: '/api/loginByUser',
    method: 'POST',
    data: {
      username,
      password,
    },
  })
}

export function loginByPhone({ phone, captcha }: LoginByPhone) {
  return request({
    url: '/api/loginByPhone',
    method: 'POST',
    data: {
      phone,
      captcha,
    },
  })
}

export function getCaptcha({ phone }: { phone: string }) {
  return request({
    url: '/api/getCaptcha',
    method: 'POST',
    data: {
      phone,
    },
  })
}

export function getUserInfo() {
  return request({
    url: '/api/getUserInfo',
  })
}

export function logout() {
  return request({
    url: '/api/logout',
  })
}
