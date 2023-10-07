import type { RouteRecordRaw } from 'vue-router'

export { RouteRecordRaw }

export type RouteModule = Record<string, { default: RouteRecordRaw }>
