import request from '@/utils/request'

export function getTableData() {
  return request({
    url: '/api/getTableData',
  })
}

export function getTableList(params: any) {
  return request({
    url: '/api/getTableList',
    data: params,
  })
}

export function delTableItem(params: any) {
  return request({
    url: '/api/delTableItem',
    method: 'POST',
    data: params,
  })
}
