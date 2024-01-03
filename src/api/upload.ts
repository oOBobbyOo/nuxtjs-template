import request from '@/utils/request'

export function uploadImg(params: FormData) {
  return request({
    url: '/api/file/upload/img',
    method: 'POST',
    data: params,
  })
}
