import type { Directive } from 'vue'

const clickOutside: Directive = {
  mounted(el, binding) {
    const onClickOutside = (event: MouseEvent) => {
      if (!el.contains(event.target) && el !== event.target)
        binding.value()
    }
    document.addEventListener('click', onClickOutside)
    el._clickOutside = onClickOutside
  },
  beforeUnmount(el) {
    document.removeEventListener('click', el._clickOutside)
    delete el._clickOutside
  },
}

export default clickOutside
