import { useAppStore } from '@/stores/modules/app'
import type { ThemeEnum } from '@/enums/appEnum'

export function useAppSetting() {
  const appStore = useAppStore()

  const getDarkMode = computed(() => appStore.getDarkMode)

  const setDarkMode = (mode: ThemeEnum) => {
    appStore.setDarkMode(mode)
  }

  const getPageLoading = computed(() => appStore.getPageLoading)

  return {
    getDarkMode,
    setDarkMode,
    getPageLoading,
  }
}
