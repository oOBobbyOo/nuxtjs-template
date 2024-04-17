import type { RouteMeta, RouteRecordRaw } from 'vue-router'

export interface MenuMeta extends RouteMeta {
  orderNo?: number // 序号，用于菜单的排序
  title: string // 标题
  icon?: string // 图标
  hide?: boolean // 在侧边栏中隐藏
  hideInMenu?: boolean // 在菜单中隐藏
  href?: string // 外链
  isKeepAlive?: boolean // 是否缓存
  transition?: string // 页面切换动画
}

export type MenuRecordRaw = RouteRecordRaw & {
  name: string
  path: string
  meta: MenuMeta
  children?: MenuRecordRaw[]
}

export type RouteModule = Record<string, { default: RouteRecordRaw }>
