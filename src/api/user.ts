import type { Params } from '@/typings/api'
import request from '@/utils/request'

// 新增用户
export function addUser(params: Params) {
  return request({
    url: '/api/user/add',
    method: 'POST',
    data: params,
  })
}

// 编辑用户
export function editUser(params: Params) {
  return request({
    url: '/api/user/edit',
    method: 'POST',
    data: params,
  })
}

// 删除用户
export function deleteUser(params: Params) {
  return request({
    url: '/api/user/delete',
    method: 'POST',
    data: params,
  })
}
