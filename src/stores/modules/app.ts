import { defineStore } from 'pinia'
import type { MenuSetting, ProjectConfig, TransitionSetting } from '@/config/setting/projectSetting'
import projectSetting from '@/config/setting/projectSetting'
import { deepMerge } from '@/utils'

interface AppState {
  pageLoading: boolean
  projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    pageLoading: false,
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
  },
})
