import type { MockMethod } from 'vite-plugin-mock'
import { requestSuccess } from './_util'

const roles = [
  { id: 1, name: '管理员', code: 'admin', desc: '管理员' },
  { id: 2, name: '运营', code: 'operator', desc: '运营' },
  { id: 3, name: '数据分析师', code: 'analyzer', desc: '数据分析师' },
  { id: 4, name: '审核员', code: 'auditor', desc: '审核员' },
  { id: 5, name: '产品', code: 'pm', desc: '产品' },
  { id: 6, name: '测试', code: 'test', desc: '测试' },
  { id: 7, name: '开发', code: 'developer', desc: '开发' },
  { id: 8, name: '策划', code: 'planner', desc: '策划' },
  { id: 9, name: '运维', code: 'ops', desc: '运维' },
  { id: 10, name: '市场', code: 'market', desc: '市场' },
  { id: 11, name: '财务', code: 'finance', desc: '财务' },
  { id: 12, name: '人力资源', code: 'hr', desc: '人力资源' },
  { id: 13, name: '法务', code: 'law', desc: '法务' },
  { id: 14, name: '客服', code: 'customer', desc: '客服' },
  { id: 15, name: '普通用户', code: 'user', desc: '普通用户' },
]

export const roleTableData = (() => {
  return roles.map(item => ({
    ...item,
    status: '@boolean()',
    created_at: '@datetime("yyyy-MM-dd HH:mm:ss")',
    updated_at: '@datetime("yyyy-MM-dd HH:mm:ss")',
    closed_at: '@datetime("yyyy-MM-dd HH:mm:ss")',
  }))
})()

export default [
  {
    url: '/api/role/list',
    method: 'get',
    response: () => {
      return requestSuccess({
        list: roleTableData,
        total: roleTableData.length,
      })
    },
  },
  {
    url: '/api/role/add',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return requestSuccess({
        ...body,
      })
    },
  },
  {
    url: '/api/role/edit',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return requestSuccess({
        ...body,
      })
    },
  },
  {
    url: '/api/role/delete',
    timeout: 200,
    method: 'post',
    response: () => {
      return requestSuccess({})
    },
  },
] as MockMethod[]
