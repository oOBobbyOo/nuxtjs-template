import { defineStore } from 'pinia'
import type { MenuSetting, ProjectConfig, TransitionSetting } from '@/typings/setting'
import projectSetting from '@/setting/projectSetting'
import { ThemeEnum } from '@/enums/appEnum'
import { deepMerge } from '@/utils'

interface AppState {
  darkMode: ThemeEnum
  pageLoading: boolean
  reloadFlag: boolean
  projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    darkMode: isDark.value ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    pageLoading: false,
    reloadFlag: true,
    projectConfig: projectSetting,
  }),
  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading
    },
    getDarkMode(state: AppState): ThemeEnum {
      return state.darkMode
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
    async setPageLoadingAction(loading: boolean) {
      this.setPageLoading(loading)
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

export function useAppStoreWithOut() {
  return useAppStore(store)
}
