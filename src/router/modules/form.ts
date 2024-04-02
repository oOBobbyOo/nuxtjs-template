import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const about: MenuRecordRaw = {
  path: '/from',
  name: 'From',
  component: Layout,
  redirect: '/from/basicForm',
  meta: {
    orderNo: 1,
    icon: 'material-symbols:edit-square-outline',
    title: 'routes.form.form',
    isKeepAlive: true,
  },
  children: [
    {
      path: 'basicForm',
      name: 'BasicForm',
      component: () => import('@/views/form/basicForm/index.vue'),
      meta: {
        icon: 'material-symbols:edit-note',
        title: 'routes.form.basicForm',
        isKeepAlive: true,
      },
    },
  ],
}

export default about
