import type { Router } from 'vue-router'

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (_to, _from, next) => {
    next()
  })
}
