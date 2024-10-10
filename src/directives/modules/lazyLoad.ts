import type { Directive, DirectiveBinding } from 'vue'
import { throttle } from 'lodash-es'

interface ElType extends HTMLImageElement {
  $data_src: string
  $io: IntersectionObserver
}

const lazyLoad: Directive = {
  beforeMount(el: ElType, binding: DirectiveBinding) {
    // 设置图片加载失败的默认图片
    el.onerror = () => {
      el.src = '/src/assets/common/error.png'
    }
    el.$data_src = binding.value.src
  },
  mounted(el, binding) {
    IntersectionObserver ? handleIoEvent(el, binding) : handleScrollEvent(el, binding)
  },
  updated(el, binding) {
    el.$data_src = binding.value.src
  },
  unmounted(el) {
    IntersectionObserver && el.$io.disconnect()
  },
}

function handleIoEvent(el: ElType, binding: DirectiveBinding) {
  const io = new IntersectionObserver((entries) => {
    const realSrc = el.$data_src
    if (entries[0].isIntersecting) {
      realSrc && (el.src = realSrc)
      binding.value.callback(el)
    }
  })
  el.$io = io
  io.observe(el)
}

function handleScrollEvent(el: ElType, binding: DirectiveBinding) {
  const handler = throttle(() => {
    loadImg(el, binding)
  }, 250)
  loadImg(el, binding)
  window.addEventListener(
    'scroll',
    () => {
      handler()
    },
    true,
  )
}

function getClientHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight
}

function isElementInViewport(el: ElType) {
  if (typeof el.getBoundingClientRect !== 'function')
    return true

  const clientHeight = getClientHeight()
  const rect = el.getBoundingClientRect()
  return rect.top < clientHeight
}

function loadImg(el: ElType, binding: DirectiveBinding) {
  const realSrc = el.$data_src
  if (isElementInViewport(el)) {
    realSrc && (el.src = realSrc)
    binding.value.callback(el)
  }
}

export default lazyLoad
