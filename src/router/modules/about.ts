import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const about: MenuRecordRaw = {
  path: '/about',
  name: 'About',
  component: Layout,
  redirect: '/about/index',
  meta: {
    orderNo: 12,
    icon: 'fluent:book-information-24-regular',
    title: 'routes.about.about',
    hideInMenu: true,
    isKeepAlive: true,
  },
  children: [
    {
      path: 'index',
      name: 'AboutIndex',
      component: () => import('@/views/about/index.vue'),
      meta: {
        icon: 'fluent:book-information-24-regular',
        title: 'routes.about.about',
        isKeepAlive: true,
      },
    },
  ],
}

export default about
