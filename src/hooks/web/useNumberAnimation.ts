export function useNumberAnimation(options: {
  from: number // 起始值
  to: number // 目标值
  duration: number // 延迟间隔（ms）
  onProcess?: (value: number) => void // 更新回调函数
}) {
  const { from, to, duration, onProcess } = options
  let value: number = from
  // 增长速度
  const speed = (to - from) / duration
  // 起始时间
  const startTime = Date.now()
  const run = () => {
    // 时间间隔
    const t = Date.now() - startTime
    // 当时间间隔大于延迟时间终止
    if (t >= duration) {
      value = to
      onProcess?.(value)
      return
    }
    value = from + t * speed
    onProcess?.(value)
    requestAnimationFrame(run)
  }
  run()
}
