<script setup lang="ts">
// https://github.com/DIYgod/DPlayer
import DPlayer from 'dplayer'

const dplayerRef = ref<HTMLElement>()
const player = ref<DPlayer>()

function renderDPlayer() {
  if (!dplayerRef.value)
    return

  // https://dplayer.diygod.dev/zh/guide.html#special-thanks
  player.value = new DPlayer({
    container: dplayerRef.value,
    live: false, // 开启直播模式
    autoplay: false, // 自动播放
    theme: '#f00', // 主题色
    loop: false, // 是否循环播放
    screenshot: true, // 开启截图，如果开启，视频和视频封面需要允许跨域
    video: {
      url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
      pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
      thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg',
    },
  })
}

function destroyDPlayer() {
  player.value?.destroy()
}

onMounted(() => {
  renderDPlayer()
})

onUnmounted(() => {
  destroyDPlayer()
})
</script>

<template>
  <div h-screen>
    <Card title="DPlayer">
      <div ref="dplayerRef" wh-full />
    </Card>
  </div>
</template>

<style scoped></style>
