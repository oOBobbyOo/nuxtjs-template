import type { MenuRecordRaw, RouteModule } from '@/typings/router'

// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob('../modules/**/*.ts', { eager: true }) as RouteModule

const routeModuleList: MenuRecordRaw[] = []

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const dynamicRoutes = [...routeModuleList]
