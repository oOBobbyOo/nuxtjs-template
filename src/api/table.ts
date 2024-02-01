import type { Params } from '@/typings/api'
import request from '@/utils/request'

export function getBasicTable(params: Params) {
  return request({
    url: '/api/getBasicTable',
    data: params,
  })
}

export function getAdvancedTable(params: Params) {
  return request({
    url: '/api/getAdvancedTable',
    data: params,
  })
}

export function getComplexTable(params: Params) {
  return request({
    url: '/api/getComplexTable',
    method: 'POST',
    data: params,
  })
}

export function delTableItem(params: Params) {
  return request({
    url: '/api/delTableItem',
    method: 'POST',
    data: params,
  })
}
