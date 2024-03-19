import request from '@/utils/request'

export function uploadImg(params: FormData) {
  return request({
    url: '/api/file/upload/img',
    method: 'POST',
    data: params,
  })
}

export function uploadAvatar(params: any) {
  return request({
    url: '/api/file/upload/avatar',
    method: 'POST',
    data: params,
  })
}
