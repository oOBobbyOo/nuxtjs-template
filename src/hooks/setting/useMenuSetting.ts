import type { MenuSetting } from '@/config/setting/projectSetting'
import { useAppStore } from '@/stores/modules/app'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  const setMenuSetting = (menuSetting: Partial<MenuSetting>) => {
    appStore.setMenuSetting(menuSetting)
  }

  const toggleCollapsed = () => {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  const getMiniMenuWidth = computed(() => appStore.getMenuSetting.minMenuWidth)

  const getRealWidth = computed(() => {
    return unref(getCollapsed) ? unref(getMiniMenuWidth) : unref(getMenuWidth)
  })

  return {
    getCollapsed,
    toggleCollapsed,
    getRealWidth,
  }
}
