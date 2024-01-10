import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import { requestSuccess } from './_util'

const year = new Date().getFullYear()

const salesData = Mock.mock({
  data: [
    {
      'x': '@range(1, 13)',
      'y|12': ['@natural(60, 100)'],
      't': `${year - 2}年销售额`,
    },
    {
      'x': '@range(1, 13)',
      'y|12': ['@natural(100, 160)'],
      't': `${year - 1}年销售额`,
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
