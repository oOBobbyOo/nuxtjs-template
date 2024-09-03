import type { Params } from '@/typings/api'
import request from '@/utils/request'

// 菜单列表
export function getMenuList(params: Params) {
  return request({
    url: '/api/menu/list',
    method: 'GET',
    data: params,
  })
}
