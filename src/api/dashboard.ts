import request from '@/utils/request'

export function getAnalysisChart() {
  return request({
    url: '/api/getAnalysisChart',
  })
}
