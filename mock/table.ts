import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import { requestSuccess } from './_util'

const basicTableData = Mock.mock({
  'data|50': [
    {
      'id': '@id()',
      'name': '@cname()',
      'age': '@natural(10, 100)',
      'email': '@email()',
      'address': '@city(true)',
      'tags|1-3': [
        {
          name: '@cword(2,3)',
          color: '@hex()',
        },
      ],
      'ctime': '@datetime("yyyy-MM-dd HH:mm:ss")',
    },
  ],
})

const statusMap = {
  0: {
    name: '进行中',
  },
  1: {
    type: 'success',
    name: '已完成',
  },
  2: {
    type: 'warning',
    name: '警告',
  },
  3: {
    type: 'danger',
    name: '失败',
  },
  4: {
    type: 'info',
    name: '未完成',
  },
}

const anvancedTableData = Mock.mock({
  'data|50': [
    {
      'id': '@id()',
      'title': '@ctitle()',
      'state|1': ['close', 'running', 'online', 'error'],
      'progress|0-100': 100,
      'labels|1-1': () => {
        const idx = Math.floor(Math.random() * 5)
        return [statusMap[idx]]
      },
      'memo': '@cparagraph()',
      'created_at': '@datetime("yyyy-MM-dd")',
      'updated_at': '@datetime("yyyy-MM-dd")',
      'closed_at': '@datetime("yyyy-MM-dd")',
    },
  ],
})

export default [
  {
    url: '/api/getTableData',
    method: 'get',
    response: () => {
      return requestSuccess({
        basicTable: basicTableData.data,
        anvancedTable: anvancedTableData.data,
      })
    },
  },
] as MockMethod[]
