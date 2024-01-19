/** 变量前缀 */
const PRE = '--el-color-primary'
/** 浅色变量前缀 */
const PRE_LIGHT = `${PRE}-light`
/** 深色变量前缀 */
const PRE_DARK = `${PRE}-dark`
/** 色阶 */
const Levels = [3, 5, 7, 8, 9]

/** 白色 */
const WHITE = '#FFFFFF'
/** 黑色 */
const BLACK = '#000000'
/** DOC */
const html = document.documentElement

/**
 * 混合颜色
 */
function mix(color1: string, color2: string, weight: number) {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  const r1 = Number.parseInt(color1.substring(1, 3), 16)
  const g1 = Number.parseInt(color1.substring(3, 5), 16)
  const b1 = Number.parseInt(color1.substring(5, 7), 16)
  const r2 = Number.parseInt(color2.substring(1, 3), 16)
  const g2 = Number.parseInt(color2.substring(3, 5), 16)
  const b2 = Number.parseInt(color2.substring(5, 7), 16)
  const r = Math.round(r1 * (1 - weight) + r2 * weight)
  const g = Math.round(g1 * (1 - weight) + g2 * weight)
  const b = Math.round(b1 * (1 - weight) + b2 * weight)
  const _r = (`0${(r || 0).toString(16)}`).slice(-2)
  const _g = (`0${(g || 0).toString(16)}`).slice(-2)
  const _b = (`0${(b || 0).toString(16)}`).slice(-2)
  return `#${_r}${_g}${_b}`
}

/**
 * 更换颜色的方法
 * @param color 颜色
 */
function changeTheme(color?: string | null) {
  if (!color) {
    console.warn('未获取到颜色的值')
    return
  }
  // 设置主要颜色变量 --el-color-primary
  html.style.setProperty(PRE, color)
  // 循环设置色阶颜色
  // --el-color-primary-light-${level}
  Levels.forEach((level) => {
    html.style.setProperty(`${PRE_LIGHT}-${level}`, mix(color, WHITE, level * 0.1))
  })
  // 设置主要暗色
  // --el-color-primary-dark-2
  const dark = mix(color, BLACK, 0.2)
  html.style.setProperty(`${PRE_DARK}-2`, dark)
}

export function useEleTheme(color?: string) {
  onBeforeMount(() => {
    changeTheme(color)
  })

  return {
    changeTheme,
  }
}
