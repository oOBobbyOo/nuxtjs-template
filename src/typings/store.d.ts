import type { RoleEnum } from '@/enums/roleEnum'

export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
  roles: RoleEnum[]
}

export interface Tab {
  name: string
  fullPath: string
  meta: {
    title: string
    icon: string
  }
}
