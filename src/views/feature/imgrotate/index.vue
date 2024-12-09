<script setup lang="ts">
function getImgs() {
  const imgs = []
  for (let i = 1; i <= 5; i++) {
    const img = new URL(`../../../assets/rotate/${i}.jpg`, import.meta.url).href
    imgs.push(img)
  }
  return imgs
}
</script>

<template>
  <div class="h-full flex-center">
    <div class="img-rotate">
      <div v-for="img in getImgs()" :key="img" class="item">
        <img :src="img">
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.img-rotate {
  width: 400px;
  height: 400px;
  display: grid;
  grid-template:
    'A A B'
    'C D B'
    'C E E';
  gap: 10px;
  animation: rotate 15s linear infinite;

  .item {
    overflow: hidden;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    &:nth-child(1) {
      grid-area: A;
    }

    &:nth-child(2) {
      grid-area: B;
    }

    &:nth-child(3) {
      grid-area: C;
    }

    &:nth-child(4) {
      grid-area: D;
    }

    &:nth-child(5) {
      grid-area: E;
    }

    img {
      width: 250%;
      height: 250%;
      object-fit: cover;
      animation: rotate 15s linear infinite reverse;
    }
  }

}

img {
  max-width: inherit;
  overflow-clip-margin: content-box;
  overflow: clip;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
