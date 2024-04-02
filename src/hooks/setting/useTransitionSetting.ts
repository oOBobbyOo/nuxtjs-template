import type { TransitionSetting } from '@/typings/setting'
import { useAppStore } from '@/stores/modules/app'

export function useTransitionSetting() {
  const appStore = useAppStore()

  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress)

  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading
  })

  const setTransitionSetting = (transitionSetting: Partial<TransitionSetting>) => {
    appStore.setTransitionSetting(transitionSetting)
  }

  const toggleOpenNProgress = () => {
    setTransitionSetting({
      openNProgress: !unref(getOpenNProgress),
    })
  }

  return {
    getOpenNProgress,
    toggleOpenNProgress,
    getOpenPageLoading,
    setTransitionSetting,
  }
}
