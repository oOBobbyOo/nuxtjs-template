import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const directives: MenuRecordRaw = {
  path: '/directives',
  name: 'Directives',
  component: Layout,
  redirect: '/directives/index',
  meta: {
    orderNo: 4,
    icon: 'carbon:stamp',
    title: 'routes.directives.directives',
    isKeepAlive: true,
  },
  children: [
    {
      path: 'index',
      name: 'Commonly',
      component: () => import('@/views/directives/index.vue'),
      meta: {
        icon: 'mdi:stamper',
        title: 'routes.directives.commonly',
        isKeepAlive: true,
      },
    },
    {
      path: 'watermark',
      name: 'Watermark',
      component: () => import('@/views/directives/watermark.vue'),
      meta: {
        icon: 'mdi:stamper',
        title: 'routes.directives.watermark',
        isKeepAlive: true,
      },
    },
  ],
}

export default directives
