import type { RouteLocationRaw } from 'vue-router'
import { router as globalRouter } from '@/router'
import { openWindow } from '@/utils'

/**
 * 路由跳转
 * @param inSetup - 是否在vue页面/组件的setup里面调用，在axios里面无法使用useRouter和useRoute
 */
export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter
  const route = globalRouter.currentRoute

  /**
   * 路由跳转
   * @param to to - 需要跳转的路由
   * @param newTab - 是否在新的浏览器Tab标签打开
   */
  function routerPush(to: RouteLocationRaw, newTab = false) {
    if (newTab) {
      const { meta } = router.resolve(to)
      openWindow(meta.href as string)
      return Promise.resolve()
    }
    return router.push(to)
  }

  /**
   * 返回上一级路由
   */
  function routerBack() {
    router.go(-1)
  }

  /**
   * 登录页切换其他模块
   * @param module - 切换后的登录模块
   */
  function toLoginModule(module: string) {
    const { query } = route.value
    routerPush({ name: 'LoginModule', params: { module }, query })
  }

  return {
    routerPush,
    routerBack,
    toLoginModule,
  }
}
