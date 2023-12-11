import { LoginRoute, NotFound, RootRoute } from '.'
import type { MenuRecordRaw } from '@/typings/router'

export const Layout = () => import('@/layouts/default/index.vue')

export const constantRoutes: MenuRecordRaw[] = [RootRoute, LoginRoute, NotFound]
