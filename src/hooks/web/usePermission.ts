import { intersection } from 'lodash-es'
import type { UserInfo } from '@/typings/store'
import type { RoleEnum } from '@/enums/RoleEnum'
import { useUserStore } from '@/stores/modules/user'
import { isArray } from '@/utils/is'

// 权限判断
export function usePermission() {
  const user = useUserStore()

  function hasPermission(permission: RoleEnum | RoleEnum[] | string | string[]): boolean {
    const { roles } = user.userInfo as UserInfo
    if (!isArray(permission))
      return roles.includes(permission as RoleEnum)

    return (intersection(permission, roles) as RoleEnum[]).length > 0
  }

  return {
    hasPermission,
  }
}
