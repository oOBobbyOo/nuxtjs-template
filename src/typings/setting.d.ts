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
  openKeepAlive: boolean
}
