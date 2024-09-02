import type { Params } from '@/typings/api'
import request from '@/utils/request'

// 角色列表
export function getRoleList(params: Params) {
  return request({
    url: '/api/role/list',
    method: 'GET',
    data: params,
  })
}

// 新增角色
export function addRole(params: Params) {
  return request({
    url: '/api/role/add',
    method: 'POST',
    data: params,
  })
}

// 编辑角色
export function editRole(params: Params) {
  return request({
    url: '/api/role/edit',
    method: 'POST',
    data: params,
  })
}

// 删除角色
export function deleteRole(params: Params) {
  return request({
    url: '/api/role/delete',
    method: 'POST',
    data: params,
  })
}
