<script setup lang="ts">
// https://github.com/bytedance/xgplayer
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

const xgplayerRef = ref<HTMLElement>()
const player = ref<Player>()

function renderXgPlayer() {
  if (!xgplayerRef.value)
    return
  const url
    = 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
  const poster
    = '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg'

  // https://h5player.bytedance.com/config/
  player.value = new Player({
    el: xgplayerRef.value,
    url, // 视频地址
    poster, // 封面图地址
    autoplay: false, // 是否自动播放
    loop: false, // 是否循环播放
    screenShot: false, // 是否使用截图插件
    playbackRate: [0.5, 0.75, 1, 1.5, 2], // 传入倍速可选数组
    fluid: true, // 是否启用流式布局
    videoAttributes: {
      crossOrigin: 'anonymous',
    },
  })
}

function destroyXgPlayer() {
  player.value?.destroy()
}

onMounted(() => {
  renderXgPlayer()
})

onUnmounted(() => {
  destroyXgPlayer()
})
</script>

<template>
  <div h-screen>
    <Card title="西瓜播放器">
      <div ref="xgplayerRef" wh-full />
    </Card>
  </div>
</template>

<style scoped></style>
