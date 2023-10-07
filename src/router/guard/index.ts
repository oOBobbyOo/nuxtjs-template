import type { Router } from 'vue-router'
import { unref } from 'vue'
import NProgress from '@/utils/progress'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'

export function createRouterGuard(router: Router) {
  createProgressGuard(router)
}

export function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting()
  router.beforeEach(async (to) => {
    if (to.meta.loaded)
      return true

    unref(getOpenNProgress) && NProgress.start()
    return true
  })

  router.afterEach(async () => {
    unref(getOpenNProgress) && NProgress.done()
    return true
  })
}
