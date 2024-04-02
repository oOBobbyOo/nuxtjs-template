import type { ProjectConfig } from '@/typings/setting'
import { CacheTypeEnum } from '@/enums/cacheEnum'

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

  // keep-alive Setting
  openKeepAlive: true,
}

export default setting
