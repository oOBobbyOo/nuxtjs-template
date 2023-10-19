import { defineStore } from 'pinia'
import type { MenuSetting, ProjectConfig, TransitionSetting } from '@/config/setting/projectSetting'
import projectSetting from '@/config/setting/projectSetting'
import { deepMerge } from '@/utils'

interface AppState {
  pageLoading: boolean
  reloadFlag: boolean
  projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    pageLoading: false,
    reloadFlag: true,
    projectConfig: projectSetting,
  }),
  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading
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
