import type { Directive, DirectiveBinding } from 'vue'

const longpress: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function')
      throw new TypeError('callback must be a function')
    // 运行函数
    const handler = (e: MouseEvent | TouchEvent) => {
      // 执行传递给指令的方法
      binding.value(e)
    }
    // 定义变量
    let pressTimer: any = null
    // 创建计时器（ 2秒后执行函数 ）
    const start = (e: any) => {
      if (e.button) {
        if (e.type === 'click' && e.button !== 0)
          return
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          // 执行函数
          handler(e)
        }, 1000)
      }
    }
    // 取消计时器
    const cancel = () => {
      // 检查计时器是否有值
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
}

export default longpress
