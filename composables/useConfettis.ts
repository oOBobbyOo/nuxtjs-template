import { onMounted } from 'vue'
import JSConfetti from 'js-confetti'
import type { Ref } from 'vue'

export function useConfettis(
  canvas: Ref<HTMLCanvasElement>,
  options?: {},
) {
  let confettiInstance: JSConfetti

  onMounted(() => {
    if (canvas.value) {
      confettiInstance = new JSConfetti({
        canvas: canvas.value,
      })
    }
  })

  const confettis = () => {
    confettiInstance.addConfetti({
      emojis: ['🖖', '🥰', '🌈', '⚡️', '💥', '✨', '💫', '🌸'],
      emojiSize: 20, // default: 80
      confettiNumber: 30, // defalut: 40
      ...options,
    })
  }

  return {
    poof: confettis,
  }
}
