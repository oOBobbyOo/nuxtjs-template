import request from '@/utils/request'

export function getTableData() {
  return request({
    url: '/api/getTableData',
  })
}
