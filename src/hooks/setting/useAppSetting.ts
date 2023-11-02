import { useAppStore } from '@/stores/modules/app'

export function useAppSetting() {
  const appStore = useAppStore()

  const getDarkMode = computed(() => appStore.getDarkMode)

  const getPageLoading = computed(() => appStore.getPageLoading)

  return {
    getDarkMode,
    getPageLoading,
  }
}
