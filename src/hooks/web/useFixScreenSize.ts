export function useFixScreenSize({ width = 1920, height = 1080, wait = 300 } = {}) {
  const dataScreenRef = ref<HTMLElement | null>(null)

  // 根据浏览器大小推断缩放比例
  const getScale = () => {
    const ww = window.innerWidth / width
    const wh = window.innerHeight / height
    return Math.min(wh, ww).toFixed(6) // ww < wh ? ww : wh
  }

  const debouncedFn = useDebounceFn(() => {
    if (dataScreenRef?.value) {
      dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
      dataScreenRef.value.style.transformOrigin = 'left top'
      dataScreenRef.value.style.width = `${width}px`
      dataScreenRef.value.style.height = `${height}px`
    }
  }, wait)

  onMounted(() => {
    debouncedFn()
    window.addEventListener('resize', debouncedFn, false)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedFn, false)
  })

  return [dataScreenRef]
}
