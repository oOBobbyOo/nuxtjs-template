import { useAppStore } from '@/stores/modules/app'

export function useTransitionSetting() {
  const appStore = useAppStore()

  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress)

  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading
  })

  return {
    getOpenNProgress,
    getOpenPageLoading,
  }
}
