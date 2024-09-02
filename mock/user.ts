import type { MockMethod } from 'vite-plugin-mock'
import { requestSuccess } from './_util'
import { basicTableData } from './table'

export default [
  {
    url: '/api/user/list',
    method: 'get',
    response: () => {
      return requestSuccess({
        list: basicTableData.data,
        total: 250,
      })
    },
  },
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
