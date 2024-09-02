import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import { requestSuccess } from './_util'

export const basicTableData = Mock.mock({
  'data|500': [
    {
      'id': '@id()',
      'username': '@cname()',
      'gender|1-2': 2,
      'age': '@natural(1, 100)',
      'phone': /^1[3456789]\d{9}$/,
      'email': '@email()',
      'address': '@city(true)',
      'status|1-2': true,
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
  'data|500': [
    {
      'id': '@id()',
      'title': '@ctitle()',
      'image': () => {
        const id = Math.floor(Math.random() * 500)
        return `https://picsum.photos/id/${id}/600/600`
      },
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
    url: '/api/getBasicTable',
    method: 'get',
    response: () => {
      return requestSuccess({
        list: basicTableData.data,
        total: 250,
      })
    },
  },
  {
    url: '/api/getAdvancedTable',
    method: 'get',
    response: () => {
      return requestSuccess({
        list: anvancedTableData.data,
        total: 500,
      })
    },
  },
  {
    url: '/api/getComplexTable',
    method: 'post',
    response: () => {
      return requestSuccess({
        list: basicTableData.data,
        total: 500,
      })
    },
  },
  {
    url: '/api/delTableItem',
    method: 'post',
    response: ({ body }) => {
      const { id } = body
      const list = anvancedTableData.data.filter(item => item.id !== id)
      return requestSuccess({
        list,
        total: 500,
      })
    },
  },
  {
    url: '/api/delTableItems',
    method: 'post',
    response: ({ body }) => {
      const { ids } = body
      const list = anvancedTableData.data.filter(item => !ids.includes(item.id))
      return requestSuccess({
        list,
        total: 500,
      })
    },
  },
] as MockMethod[]
