import type { RoleEnum } from '@/enums/roleEnum'

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined
  // Is it locked?
  isLock?: boolean
}

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
