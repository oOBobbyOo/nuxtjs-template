import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const exception: MenuRecordRaw = {
  path: '/exception',
  name: 'Exception',
  component: Layout,
  redirect: '/exception/403',
  meta: {
    orderNo: 6,
    icon: 'ant-design:exception-outlined',
    title: 'routes.exception.exception',
  },
  children: [
    {
      path: '403',
      name: 'Exception403',
      component: () => import('@/views/exception/403/index.vue'),
      meta: {
        icon: 'ic:baseline-block',
        title: 'routes.exception.403',
      },
    },
    {
      path: '404',
      name: 'Exception404',
      component: () => import('@/views/exception/404/index.vue'),
      meta: {
        icon: 'ic:baseline-web-asset-off',
        title: 'routes.exception.404',
      },
    },
    {
      path: '500',
      name: 'Exception500',
      component: () => import('@/views/exception/500/index.vue'),
      meta: {
        icon: 'ic:baseline-wifi-off',
        title: 'routes.exception.500',
      },
    },
  ],
}

export default exception
