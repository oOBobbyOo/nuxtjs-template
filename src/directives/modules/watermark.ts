import type { Directive, DirectiveBinding } from 'vue'

const watermark: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { text, font = '14px Microsoft YaHei', textColor = '#ccc' } = binding.value
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 120
    canvas.style.display = 'none'
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (ctx) {
      ctx.font = font
      ctx.fillStyle = textColor
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle' as CanvasTextBaseline
      ctx.rotate((-20 * Math.PI) / 180)
      ctx.fillText(text, canvas.width / 10, canvas.height / 2)
      const imgUrl = canvas.toDataURL('image/png')
      el.style.backgroundImage = `url(${imgUrl})`
    }
  },
}

export default watermark
