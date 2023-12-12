import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const account: MenuRecordRaw = {
  path: '/account',
  name: 'Account',
  component: Layout,
  redirect: '/account/center',
  meta: {
    orderNo: 8,
    icon: 'material-symbols:account-circle',
    title: 'routes.account.account',
  },
  children: [
    {
      path: 'center',
      name: 'AccountCenter',
      component: () => import('@/views/account/center/index.vue'),
      meta: {
        icon: 'material-symbols:user-attributes',
        title: 'routes.account.center',
      },
    },
    {
      path: 'settings',
      name: 'AccountSettings',
      component: () => import('@/views/account/settings/index.vue'),
      meta: {
        icon: 'material-symbols:manage-accounts',
        title: 'routes.account.settings',
      },
    },
  ],
}

export default account
