export interface TabProps {
  fullPath: string
  active?: boolean
  closable?: boolean
}

export type SlotFn = (props?: Record<string, unknown>) => any

export interface Slots {
  /* 插槽：Tab中间内容 */
  default?: SlotFn
  /* 插槽: Tab前缀 */
  prefix?: SlotFn
  /* 插槽: Tab后缀 */
  suffix?: SlotFn
}
