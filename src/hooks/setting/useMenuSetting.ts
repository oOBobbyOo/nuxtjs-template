import type { MenuSetting } from '@/config/setting/projectSetting'
import { useAppStore } from '@/stores/modules/app'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  const getShowSidebar = computed(() => appStore.getMenuSetting.showSidebar)

  const setMenuSetting = (menuSetting: Partial<MenuSetting>) => {
    appStore.setMenuSetting(menuSetting)
  }

  const toggleCollapsed = () => {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }

  const toggleShowSidebar = () => {
    setMenuSetting({
      showSidebar: !unref(getShowSidebar),
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
    getShowSidebar,
    toggleShowSidebar,
    getRealWidth,
  }
}
