import type { MenuRecordRaw } from '../types'
import { LoginRoute, NotFound, RootRoute } from '.'

export const Layout = () => import('@/layouts/default/index.vue')

export const constantRoutes: MenuRecordRaw[] = [RootRoute, LoginRoute, NotFound]
