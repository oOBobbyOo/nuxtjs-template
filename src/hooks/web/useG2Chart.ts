import { Chart } from '@antv/g2'
import { useAppSetting } from '@/hooks/setting/useAppSetting'

export { Chart }

export function useG2Chart(elRef: Ref<HTMLDivElement>) {
  let chartInstance: Chart | null = null
  const { getDarkMode } = useAppSetting()
  const theme = computed(() => {
    return {
      type: unref(getDarkMode),
      view: {
        viewFill: 'transparent',
      },
    }
  })

  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el))
      return

    chartInstance = new Chart({
      container: el,
      autoFit: true,
    })
    chartInstance.theme(theme.value)
  }

  function updateCharts() {
    chartInstance?.theme(theme.value)
    chartInstance?.render()
  }

  function getInstance(): Chart | null {
    if (!chartInstance)
      initCharts()

    return chartInstance
  }

  function resize() {
    chartInstance?.render()
    chartInstance?.forceFit()
  }

  const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 })

  useResizeObserver(elRef, () => {
    debouncedResize()
  })

  onMounted(() => {
    initCharts()
  })

  watch(
    () => theme.value,
    () => {
      updateCharts()
    },
  )

  tryOnUnmounted(() => {
    if (!chartInstance)
      return
    chartInstance.destroy()
    chartInstance = null
  })

  return {
    getInstance,
  }
}
