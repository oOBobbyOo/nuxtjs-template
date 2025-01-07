import dayjs from 'dayjs'
import { type CurrentTime } from '@/hooks/web/useCountDown'

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
 * @description 剩余多少时间
 * @param {dayjs.OpUnitType} type
 */
export function remainTime(type: dayjs.OpUnitType = 'day'): number {
  const now = dayjs()
  const end = dayjs().endOf(type)
  return end.diff(now)
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

/**
 * @description 时间补0
 * @param {number} num
 * @param {number} targetLength
 */
export function padZero(num: number, targetLength = 2): string {
  let str = `${num}`
  while (str.length < targetLength)
    str = `0${str}`

  return str
}

/**
 * 时间格式化
 * @param {string} format
 * @param {CurrentTime} currentTime
 */
export function parseFormat(format: string, currentTime: CurrentTime): string {
  const { days } = currentTime
  let { hours, minutes, seconds, milliseconds } = currentTime

  if (format.includes('DD'))
    format = format.replace('DD', padZero(days))
  else
    hours += days * 24

  if (format.includes('HH'))
    format = format.replace('HH', padZero(hours))
  else
    minutes += hours * 60

  if (format.includes('mm'))
    format = format.replace('mm', padZero(minutes))
  else
    seconds += minutes * 60

  if (format.includes('ss'))
    format = format.replace('ss', padZero(seconds))
  else
    milliseconds += seconds * 1000

  if (format.includes('S')) {
    const ms = padZero(milliseconds, 3)

    if (format.includes('SSS'))
      format = format.replace('SSS', ms)
    else if (format.includes('SS'))
      format = format.replace('SS', ms.slice(0, 2))
    else
      format = format.replace('S', ms.charAt(0))
  }

  return format
}
