import { intersection } from 'lodash-es'
import type { RoleEnum } from '@/enums/roleEnum'
import { usePermissionStore } from '@/stores/modules/permission'
import { isArray } from '@/utils/is'

// 权限判断
export function usePermission() {
  const permissionStore = usePermissionStore()

  function hasPermission(permission?: RoleEnum | RoleEnum[] | string | string[]): boolean {
    if (!permission)
      return true

    const roleList = permissionStore.getRoleList

    if (!isArray(permission))
      return roleList.includes(permission as RoleEnum)

    return (intersection(permission, roleList) as RoleEnum[]).length > 0
  }

  return {
    hasPermission,
  }
}
