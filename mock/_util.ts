import type { Recordable } from 'vite-plugin-mock'
import { ResultEnum } from '../src/enums/httpEnum'

export function requestSuccess<T = Recordable>(data: T, { message = 'Request Success' } = {}) {
  return {
    code: ResultEnum.SUCCESS,
    data,
    message,
    type: 'success',
  }
}

export function requestFailed(message = 'Request failed') {
  return {
    code: ResultEnum.ERROR,
    data: null,
    message,
    type: 'error',
  }
}

export interface requestParams {
  method: string
  headers?: { authorization?: string }
  body: any
  query: any
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  const token = headers?.authorization?.split(' ')[1]
  return token
}
