import type { Router } from 'vue-router'
import { unref } from 'vue'
import { createPermissionGuard } from './permissionGuard'
import { createPageTitleGuard } from './pageTitleGugrd'
import NProgress from '@/utils/progress'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { useUserStoreWithOut } from '@/stores/modules/user'
import { useAppStoreWithOut } from '@/stores/modules/app'

export function createRouterGuard(router: Router) {
  createPageLoadingGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createPageTitleGuard(router)
}

export function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const appStore = useAppStoreWithOut()
  const { getOpenPageLoading } = useTransitionSetting()
  router.beforeEach(async (to) => {
    if (!userStore.getToken)
      return true

    if (to.meta.loaded)
      return true

    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true)
      return true
    }

    return true
  })
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      setTimeout(() => {
        appStore.setPageLoading(false)
      }, 220)
    }
    return true
  })
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
