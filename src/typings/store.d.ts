import type { RoleEnum } from '@/enums/roleEnum'

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined
  // Is it locked?
  isLock?: boolean
}

interface Tag {
  key: string
  label: string
}

export interface UserInfo {
  uid: string | number
  username: string
  realName: string
  avatar: string
  roles: RoleEnum[]
  profile?: string
  email?: string
  address?: string
  tags?: Tag[]
}

export interface Tab {
  name: string
  fullPath: string
  meta: {
    title: string
    icon: string
  }
}
