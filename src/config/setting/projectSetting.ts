export interface TransitionSetting {
  enable: boolean
  openPageLoading: boolean
  openNProgress: boolean
}

export interface ProjectConfig {
  transitionSetting: TransitionSetting
}

const setting: ProjectConfig = {
  transitionSetting: {
    enable: true,
    openPageLoading: true,
    openNProgress: false,
  },
}

export default setting
