import type { Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  disabled: boolean
}

/**
 * v-throttle
 * {
 *   event: Event
 *   fn: Function
 *   delay: number
 * }
 * @description 按钮节流指令,规定时间内只能点击一次
 */
const throttle: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    const { event, fn, delay } = binding.value
    if (typeof fn !== 'function')
      throw new Error('callback must be a function')

    const eventType = event || 'click'
    const delayTime = delay || 500
    let timer: NodeJS.Timeout | null = null

    const handleFn = function () {
      if (timer)
        clearTimeout(timer)

      if (!el.disabled) {
        el.disabled = true
        fn()
        timer = setTimeout(() => {
          el.disabled = false
        }, delayTime)
      }
    }
    useEventListener(el, eventType, handleFn)
  },
}

export default throttle
