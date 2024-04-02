import type { ThemeEnum } from '@/enums/appEnum'
import type { ProjectConfig } from '@/typings/setting'
import { useAppStore } from '@/stores/modules/app'

export function useAppSetting() {
  const appStore = useAppStore()

  const getDarkMode = computed(() => appStore.getDarkMode)

  const setDarkMode = (mode: ThemeEnum) => {
    appStore.setDarkMode(mode)
  }

  const getPageLoading = computed(() => appStore.getPageLoading)

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive)

  const setAppSetting = (setting: Partial<ProjectConfig>) => {
    appStore.setProjectConfig(setting)
  }

  const toggleOpenKeepAlive = () => {
    setAppSetting({
      openKeepAlive: !unref(getOpenKeepAlive),
    })
  }

  return {
    getDarkMode,
    setDarkMode,
    getPageLoading,
    getOpenKeepAlive,
    toggleOpenKeepAlive,
    setAppSetting,
  }
}
