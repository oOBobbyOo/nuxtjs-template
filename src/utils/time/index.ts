import dayjs from 'dayjs'

const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/**
 * @description 格式化日期
 * @param {dayjs.ConfigType} date
 * @param {string} format YYYY-MM-DD
 */
export function formatToDate(date?: dayjs.ConfigType, format: string = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

/**
 * @description 格式化时间
 * @param {dayjs.ConfigType} date
 * @param {string} format YYYY-MM-DD HH:mm:ss
 */
export function formatToDateTime(
  date?: dayjs.ConfigType,
  format: string = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format)
}

/**
 * @description 获取当前时间对应的提示语
 */
export function getTimeState(): string {
  const timeState = ['凌晨好 🌙', '早上好 ⛅', '上午好 🌤', '中午好 🌞', '下午好 ☀️', '晚上好 🌛']
  const hours = new Date().getHours()
  if (hours > 0 && hours <= 6)
    return timeState[0]
  if (hours > 6 && hours <= 8)
    return timeState[1]
  if (hours > 8 && hours <= 11)
    return timeState[2]
  if (hours > 11 && hours <= 14)
    return timeState[3]
  if (hours > 14 && hours <= 18)
    return timeState[4]
  if (hours > 18 && hours <= 24)
    return timeState[5]
  return timeState[1]
}

/**
 * @description 补0
 * @param {number} n
 */
export function formatPadZero(n: number): string {
  return n.toString().padStart(2, '0')
}

/**
 * @description 获取 Unix 时间戳 (毫秒)
 * @param time 时间
 */
export function getDayjsValueOf(time?: string): number {
  return dayjs(time).valueOf()
}
