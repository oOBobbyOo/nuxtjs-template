import { defineStore } from 'pinia'
import type { MenuSetting, ProjectConfig, TransitionSetting } from '@/config/setting/projectSetting'
import projectSetting from '@/config/setting/projectSetting'
import { ThemeEnum } from '@/enums/appEnum'
import { deepMerge } from '@/utils'

interface AppState {
  darkMode?: ThemeEnum
  pageLoading: boolean
  reloadFlag: boolean
  projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    reloadFlag: true,
    projectConfig: projectSetting,
  }),
  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading
    },
    getDarkMode(state: AppState): 'light' | 'dark' | string {
      return state.darkMode || ThemeEnum.LIGHT
    },
    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig)
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
    },
    setMenuSetting(setting: Partial<MenuSetting>) {
      this.projectConfig!.menuSetting = deepMerge(this.projectConfig!.menuSetting, setting)
    },
    async reloadPage(duration = 0) {
      this.reloadFlag = false
      await nextTick()
      if (duration) {
        setTimeout(() => {
          this.reloadFlag = true
        }, duration)
      }
      else {
        this.reloadFlag = true
      }
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 })
      }, 100)
    },
  },
})
