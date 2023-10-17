import type { MenuRecordRaw } from '../types'

// 根路由
export const RootRoute: MenuRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard',
  meta: {
    title: 'Root',
  },
}
