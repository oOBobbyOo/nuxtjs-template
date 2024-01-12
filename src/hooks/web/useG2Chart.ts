import { Chart } from '@antv/g2'

export { Chart }

export function useG2Chart(elRef: Ref<HTMLDivElement>) {
  let chartInstance: Chart | null = null

  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el))
      return

    chartInstance = new Chart({
      container: el,
      autoFit: true,
    })
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
