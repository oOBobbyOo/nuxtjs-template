import { useBoolean } from './useBoolean'

export function useDrawer() {
  const { bool: visible, setTrue, setFalse, toggle } = useBoolean(false)

  return {
    visible,
    openDrawer: setTrue,
    closeDrawer: setFalse,
    toggleDrawer: toggle,
  }
}
