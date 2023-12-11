import { CacheTypeEnum } from '@/enums/cacheEnum'

export interface MenuSetting {
  collapsed: boolean
  showSidebar: boolean
  menuWidth: number
  minMenuWidth: number
}

export interface TransitionSetting {
  enable: boolean
  openPageLoading: boolean
  openNProgress: boolean
}

export interface ProjectConfig {
  permissionCacheType: CacheTypeEnum
  menuSetting: MenuSetting
  transitionSetting: TransitionSetting
}

const setting: ProjectConfig = {
  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // Menu Setting
  menuSetting: {
    collapsed: false,
    showSidebar: false,
    menuWidth: 200,
    minMenuWidth: 64,
  },

  // Transition Setting
  transitionSetting: {
    enable: true,
    openPageLoading: true,
    openNProgress: false,
  },
}

export default setting
