import type { AxiosResponse } from 'axios'
import { getToken } from '../auth'
import Request from './request'
import type { RequestConfig } from '@/typings/request'

export interface Response<T> {
  code: number
  message?: string
  desc?: string
  data: T
}

// 重写返回类型
interface MyRequestConfig<T, R> extends RequestConfig<Response<R>> {
  data?: T
}

const request = new Request({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      console.log('>>: 实例请求拦截器')
      const token = getToken()
      if (token)
        config.headers.Authorization = `Bearer ${token}`

      return config
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      console.log('>>: 实例响应拦截器')
      return result
    },
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {MyRequestConfig} config
 * @returns {Promise}
 */
async function myRequest<D = any, T = any>(config: MyRequestConfig<D, T>): Promise<any> {
  const { method = 'GET' } = config
  if (method.toLocaleUpperCase() === 'GET')
    config.params = config.data

  try {
    const res = await request.request<Response<T>>(config)
    if (res.code === 0) {
      return Promise.resolve(res.data)
    }
    else {
      await ElMessage.error(res?.message || res?.desc || '请求失败')
      return Promise.reject(res)
    }
  }
  catch (err) {
    return Promise.reject(err)
  }
}

export default myRequest
