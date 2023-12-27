import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const table: MenuRecordRaw = {
  path: '/table',
  name: 'Table',
  component: Layout,
  redirect: '/table/basicTable',
  meta: {
    orderNo: 2,
    icon: 'mdi:table-large',
    title: 'routes.table.table',
  },
  children: [
    {
      path: 'basicTable',
      name: 'BasicTable',
      component: () => import('@/views/table/basicTable/index.vue'),
      meta: {
        icon: 'material-symbols:table',
        title: 'routes.table.basicTable',
      },
    },
  ],
}

export default table
