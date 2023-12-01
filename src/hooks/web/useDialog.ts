import { useBoolean } from './useBoolean'

export function useDialog() {
  const { bool: visible, setTrue, setFalse, toggle } = useBoolean(false)

  return {
    visible,
    openDialog: setTrue,
    closeDialog: setFalse,
    toggleDialog: toggle,
  }
}
