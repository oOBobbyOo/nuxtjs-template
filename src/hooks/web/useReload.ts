import { useBoolean } from './useBoolean'

export function useRelaod() {
  const { bool: reloadFlag, setTrue, setFalse } = useBoolean(true)

  /**
   * 触发重载
   * @param duration - 延迟时间(ms)
   */
  async function handleReload(duration = 0) {
    setFalse()
    await nextTick()

    if (duration > 0) {
      setTimeout(() => {
        setTrue()
      }, duration)
    }
  }

  return {
    reloadFlag,
    handleReload,
  }
}
