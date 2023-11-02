import echarts, { type EChartsOption } from '@/composables/echarts'
import { useAppSetting } from '@/hooks/setting/useAppSetting'

export function useEcharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'default',
) {
  let chartInstance: echarts.ECharts | null = null
  const cacheOptions = ref({}) as Ref<EChartsOption>

  const { getDarkMode: getSysDarkMode } = useAppSetting()

  const getDarkMode = computed(() => {
    return theme === 'default' ? getSysDarkMode.value : theme
  })

  const getOptions = computed(() => {
    if (getDarkMode.value !== 'dark')
      return cacheOptions.value as EChartsOption

    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    } as EChartsOption
  })

  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el))
      return
    chartInstance = echarts.init(el, t)
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options
    nextTick(() => {
      if (!chartInstance) {
        initCharts(getDarkMode.value as 'default')

        if (!chartInstance)
          return
      }
      clear && chartInstance?.clear()
      chartInstance?.setOption(unref(getOptions))
    })
  }

  function resize() {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn',
      },
    })
  }

  const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 })

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance)
      initCharts(getDarkMode.value as 'default')
    return chartInstance
  }

  useResizeObserver(elRef, () => {
    debouncedResize()
  })

  watch(
    () => getDarkMode.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose()
        initCharts(theme as 'default')
        setOptions(cacheOptions.value)
      }
    },
  )

  tryOnUnmounted(() => {
    if (!chartInstance)
      return
    chartInstance.dispose()
    chartInstance = null
  })

  return {
    setOptions,
    debouncedResize,
    echarts,
    getInstance,
  }
}
