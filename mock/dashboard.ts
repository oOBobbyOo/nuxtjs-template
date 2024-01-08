import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import { requestSuccess } from './_util'

const salesData = Mock.mock({
  'data|12': [
    {
      'x|+1': 1,
      'y|60-100': 60,
      'z|100-160': 100,
    },
  ],
})

const viewsData = Mock.mock({
  'data|24': [
    {
      'x|+1': 0,
      'pv|60-100': 60,
      'uv|100-160': 100,
      'ip|10-80': 10,
    },
  ],
})

export default [
  {
    url: '/api/getAnalysisChart',
    method: 'get',
    response: () => {
      return requestSuccess({
        salesData: salesData.data,
        viewsData: viewsData.data,
      })
    },
  },
] as MockMethod[]
