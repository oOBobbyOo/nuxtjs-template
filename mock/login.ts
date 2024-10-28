import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import type { requestParams } from './_util'
import { getRequestToken, requestFailed, requestSuccess } from './_util'

export function createUserList() {
  return [
    {
      username: 'super',
      password: '123456',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NTYifQ.mustupdsA1k0jPjFL97e-C48dT-eLFjolAxiD8lOBkk',
      roles: ['super'],
    },
    {
      username: 'admin',
      password: '123456',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NTYifQ.mustupdsA1k0jPjFL97e-C48dT-eLFjolAxiD8lOBkk',
      roles: ['admin'],
    },
    {
      username: 'user',
      password: '123456',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NTYifQ.mustupdsA1k0jPjFL97e-C48dT-eLFjolAxiD8lOBkk',
      roles: ['user'],
    },
    {
      phone: '12345678999',
      captcha: '1234',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEyMzQ1Njc4OTk5IiwiY2FwdGNoYSI6IjEyMzQifQ.P9u4J9o1QF39Zj3ipmg0POtUJx5PTRI1euq4u3Ia6Ss',
      roles: ['admin'],
    },
  ]
}

const loginData = Mock.mock({
  data: {
    uid: '@id()',
    realName: '@cname()',
    avatar: 'https://api.multiavatar.com/@name().png',
    email: '@email()',
    address: '@county(true)',
    tags: [
      {
        key: '@guid()',
        label: '腹黑',
      },
      {
        key: '@guid()',
        label: '幽默',
      },
      {
        key: '@guid()',
        label: '帅气',
      },
    ],
  },
})

export default [
  {
    url: '/api/loginByUser',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createUserList().find(
        item => item.username === username && item.password === password,
      )
      if (!checkUser)
        return requestFailed('Incorrect username or password!')

      const { username: _username, token, roles } = checkUser
      return requestSuccess({
        username: _username,
        token,
        roles,
        ...loginData.data,
      })
    },
  },
  {
    url: '/api/loginByPhone',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { phone, captcha } = body
      const checkUser = createUserList().find(
        item => item.phone === phone && item.captcha === captcha,
      )
      if (!checkUser)
        return requestFailed('Incorrect phone or captcha!')

      const { phone: _phone, token, roles } = checkUser
      return requestSuccess({
        username: _phone,
        token,
        roles,
        ...loginData.data,
      })
    },
  },
  {
    url: '/api/getCaptcha',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { phone } = body
      return requestSuccess({
        code: 1234,
        phone,
      })
    },
  },
  {
    url: '/api/getUserInfo',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token)
        return requestFailed('Invalid token')
      const checkUser = createUserList().find(item => item.token === token)
      if (!checkUser)
        return requestFailed('The corresponding user information was not obtained!')

      return requestSuccess({
        username: checkUser?.username || checkUser?.phone,
        roles: checkUser.roles,
        ...loginData.data,
      })
    },
  },
  {
    url: '/api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token)
        return requestFailed('Invalid token')
      return requestSuccess({})
    },
  },
] as MockMethod[]
