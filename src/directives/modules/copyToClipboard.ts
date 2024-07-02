import type { Directive, DirectiveBinding } from 'vue'
import copy from 'copy-to-clipboard'

interface ElType extends HTMLElement {
  _targetContent: string
  _clickHandler: () => void
}

const copyToClipboard: Directive = {
  mounted(el: ElType, binding: DirectiveBinding<string>) {
    el._targetContent = binding.value

    el._clickHandler = () => {
      if (el._targetContent) {
        // 调用 copy-to-clipboard 复制内容到剪贴板
        copy(el._targetContent)

        ElMessage({
          type: 'success',
          message: '复制成功',
        })
      }
      else {
        ElMessage({
          type: 'error',
          message: '复制失败：内容为空',
        })
      }
    }

    el.addEventListener('click', el._clickHandler)
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el._targetContent = binding.value
  },
  unmounted(el: ElType) {
    el.removeEventListener('click', el._clickHandler)
  },
}

export default copyToClipboard
