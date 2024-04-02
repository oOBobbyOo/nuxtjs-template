import { useAppStore } from '@/stores/modules/app'
import type { ThemeEnum } from '@/enums/appEnum'

export function useAppSetting() {
  const appStore = useAppStore()

  const getDarkMode = computed(() => appStore.getDarkMode)

  const setDarkMode = (mode: ThemeEnum) => {
    appStore.setDarkMode(mode)
  }

  const getPageLoading = computed(() => appStore.getPageLoading)

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive)

  return {
    getDarkMode,
    setDarkMode,
    getPageLoading,
    getOpenKeepAlive,
  }
}
