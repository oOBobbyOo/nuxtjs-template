import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const about: MenuRecordRaw = {
  path: '/about',
  name: 'About',
  component: Layout,
  redirect: '/about/index',
  meta: {
    orderNo: 11,
    icon: 'fluent:book-information-24-regular',
    title: 'routes.about.about',
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('@/views/about/index.vue'),
      meta: {
        icon: 'fluent:book-information-24-regular',
        title: 'routes.about.about',
      },
    },
  ],
}

export default about
