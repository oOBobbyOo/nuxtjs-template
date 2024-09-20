import request from '@/utils/request'

export function getAnalysisChart() {
  return request({
    url: '/api/getAnalysisChart',
  })
}

export function getWeather() {
  return request({
    url: 'https://api.vvhan.com/api/weather',
  })
}
