import type { MockMethod } from 'vite-plugin-mock'
import { requestSuccess } from './_util'

export default [
  {
    url: '/api/user/add',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return requestSuccess({
        ...body,
      })
    },
  },
  {
    url: '/api/user/edit',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return requestSuccess({
        ...body,
      })
    },
  },
  {
    url: '/api/user/delete',
    timeout: 200,
    method: 'post',
    response: () => {
      return requestSuccess({})
    },
  },
] as MockMethod[]
