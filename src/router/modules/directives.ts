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
  },
  children: [
    {
      path: 'index',
      name: 'Directive',
      component: () => import('@/views/directives/index.vue'),
      meta: {
        icon: 'mdi:stamper',
        title: 'routes.directives.directive',
      },
    },
  ],
}

export default directives
