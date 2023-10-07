import type { App, Directive } from 'vue'
import { usePermission } from '@/hooks/web/usePermission'

export function setupPermissionDirective(app: App) {
  const { hasPermission } = usePermission()

  function updateElVisible(el: HTMLElement, permission: string | string[]) {
    if (!permission) {
      throw new Error(
        'need roles: like v-permission="\'admin\'", v-permission="[\'admin\', \'test]"',
      )
    }

    if (!hasPermission(permission))
      el.parentElement?.removeChild(el)
  }

  const permissionDirective: Directive<HTMLElement, string | string[]> = {
    mounted(el, binding) {
      updateElVisible(el, binding.value)
    },
    beforeUpdate(el, binding) {
      updateElVisible(el, binding.value)
    },
  }

  app.directive('permission', permissionDirective)
}
