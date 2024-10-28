import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const exception: MenuRecordRaw = {
  path: '/exception',
  name: 'Exception',
  component: Layout,
  redirect: '/exception/403',
  meta: {
    orderNo: 10,
    icon: 'ant-design:exception-outlined',
    title: 'routes.exception.exception',
    isKeepAlive: true,
  },
  children: [
    {
      path: '403',
      name: 'Exception403',
      component: () => import('@/views/exception/403/index.vue'),
      meta: {
        icon: 'ic:baseline-block',
        title: 'routes.exception.403',
        isKeepAlive: true,
      },
    },
    {
      path: '404',
      name: 'Exception404',
      component: () => import('@/views/exception/404/index.vue'),
      meta: {
        icon: 'ic:baseline-web-asset-off',
        title: 'routes.exception.404',
        isKeepAlive: true,
      },
    },
    {
      path: '500',
      name: 'Exception500',
      component: () => import('@/views/exception/500/index.vue'),
      meta: {
        icon: 'ic:baseline-wifi-off',
        title: 'routes.exception.500',
        isKeepAlive: true,
      },
    },
  ],
}

export default exception
