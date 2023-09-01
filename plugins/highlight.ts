import Hljs from 'highlight.js'

export default defineNuxtPlugin(async (NuxtApp) => {
  NuxtApp.vueApp.directive('highlight', (el) => {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block: any) => {
      Hljs.highlightBlock(block)
    })
  })
})
