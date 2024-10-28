import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const account: MenuRecordRaw = {
  path: '/account',
  name: 'Account',
  component: Layout,
  redirect: '/account/center',
  meta: {
    orderNo: 9,
    icon: 'material-symbols:account-circle',
    title: 'routes.account.account',
    isKeepAlive: true,
  },
  children: [
    {
      path: 'center',
      name: 'AccountCenter',
      component: () => import('@/views/account/center/index.vue'),
      meta: {
        icon: 'material-symbols:user-attributes',
        title: 'routes.account.center',
        isKeepAlive: true,
      },
    },
    {
      path: 'settings',
      name: 'AccountSettings',
      component: () => import('@/views/account/settings/index.vue'),
      meta: {
        icon: 'material-symbols:manage-accounts',
        title: 'routes.account.settings',
        isKeepAlive: true,
      },
    },
  ],
}

export default account
