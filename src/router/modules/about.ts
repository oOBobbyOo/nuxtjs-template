import type { MenuRecordRaw } from '../types'
import { Layout } from '../routes/constant'

const about: MenuRecordRaw = {
  path: '/about',
  name: 'About',
  component: Layout,
  redirect: '/about/index',
  meta: {
    orderNo: 10,
    icon: 'i-fluent-book-information-24-regular',
    title: 'routes.about.about',
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('@/views/about/index.vue'),
      meta: {
        icon: 'i-fluent-book-information-24-regular',
        title: 'routes.about.about',
      },
    },
  ],
}

export default about
