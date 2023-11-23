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
  menuSetting: MenuSetting
  transitionSetting: TransitionSetting
}

const setting: ProjectConfig = {
  menuSetting: {
    collapsed: false,
    showSidebar: false,
    menuWidth: 200,
    minMenuWidth: 64,
  },
  transitionSetting: {
    enable: true,
    openPageLoading: true,
    openNProgress: false,
  },
}

export default setting
