import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-debounce
 * {
 *   event: Event
 *   fn: Function
 *   delay: number
 *  immediate: boolean
 * }
 * @description 按钮防抖指令
 */
const debounce: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { event = 'click', fn, delay = 500, immediate = false } = binding.value
    if (typeof fn !== 'function')
      throw new Error('callback must be a function')

    let timer: NodeJS.Timeout | null = null
    const handleFn = function () {
      if (immediate) {
        if (!timer)
          fn()

        clearTimeout(timer!)
        timer = setTimeout(() => {
          timer = null
        }, delay)
      }
      else {
        clearTimeout(timer!)
        timer = setTimeout(() => {
          fn()
          timer = null
        }, delay)
      }
    }
    useEventListener(el, event, handleFn)
  },
}

export default debounce
