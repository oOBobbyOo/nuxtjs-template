import type { RouteRecordRaw } from '../types'
import { RootRoute } from '.'

export const Layout = () => import('@/layouts/default/index.vue')

export const constantRoutes: RouteRecordRaw[] = [RootRoute]
