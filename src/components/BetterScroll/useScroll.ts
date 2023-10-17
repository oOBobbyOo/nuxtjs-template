import type { Options } from '@better-scroll/core'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'

BScroll.use(ObserveDOM)
BScroll.use(PullDown)
BScroll.use(Pullup)

// https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html
export interface Props {
  probeType?: number // 1|2|3
  scrollX?: boolean
  scrollY?: boolean
  click?: boolean
  listenScroll?: boolean
  beforeScroll?: boolean
  afterScroll?: boolean
  pullup?: () => void
  pulldown?: () => void
  options?: Options
}

export default function useScroll(bsWrap: Ref<HTMLElement | undefined>, props: Props, emits: any) {
  const bsInstance = ref<BScroll>()

  onMounted(() => {
    initBetterScroll()
  })

  function initBetterScroll() {
    if (!bsWrap.value)
      return

    bsInstance.value = new BScroll(bsWrap.value, {
      probeType: props.probeType,
      click: props.click,
      scrollX: props.scrollX,
      scrollY: props.scrollY,
      observeDOM: true,
      ...props.options,
    }) as BScroll

    if (props.beforeScroll) {
      // 如果开启了滚动前事件派发
      bsInstance.value.on('beforeScrollStart', () => {
        emits('beforeScroll')
      })
    }

    // 如果开启了滚动(滚动中)事件派发
    if (props.listenScroll) {
      bsInstance.value.on('scroll', (pos: { x: number; y: number }) => {
        emits('scroll', pos)
      })
    }

    // 如果开启了滚动结束事件派发
    if (props.beforeScroll) {
      bsInstance.value.on('scrollEnd', () => {
        emits('afterScroll')
      })
    }
  }

  onUnmounted(() => {
    bsInstance.value && bsInstance.value.destroy()
  })

  onActivated(() => {
    bsInstance.value && bsInstance.value.enable()
    bsInstance.value && bsInstance.value.refresh()
  })

  onDeactivated(() => {
    bsInstance.value && bsInstance.value.disable()
  })

  // 代理better-scroll的disable方法
  function disable() {
    bsInstance.value && bsInstance.value.disable()
  }

  // 代理better-scroll的enable方法
  function enable() {
    bsInstance.value && bsInstance.value.enable()
  }

  // 代理better-scroll的refresh方法
  function refresh() {
    bsInstance.value && bsInstance.value.refresh()
  }

  // 代理better-scroll的scrollTo方法
  function scrollTo(...args: any) {
    bsInstance.value && bsInstance.value.scrollTo.apply(bsInstance.value, args)
  }

  // 代理better-scroll的scrollToElement方法
  function scrollToElement(...args: any) {
    bsInstance.value && bsInstance.value.scrollToElement.apply(bsInstance.value, args)
  }

  return {
    bsInstance,
    scroll,
    disable,
    enable,
    refresh,
    scrollTo,
    scrollToElement,
  }
}
