import { defineStore } from 'pinia'
import type { ProjectConfig, TransitionSetting } from '@/config/setting/projectSetting'
import projectSetting from '@/config/setting/projectSetting'

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
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting
    },
  },
})
