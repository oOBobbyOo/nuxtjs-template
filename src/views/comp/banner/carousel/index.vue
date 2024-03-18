<script setup lang="ts">
const list = ref([
  {
    id: '1',
    content: '内容1',
  },
  {
    id: '2',
    content: '内容2',
  },
  {
    id: '3',
    content: '内容3',
  },
  {
    id: '4',
    content: '内容4',
  },
  {
    id: '5',
    content: '内容5',
  },
  {
    id: '6',
    content: '内容6',
  },
])

const imgs = ref([
  {
    id: '1',
    url: 'https://picsum.photos/id/1018/1920/1080',
    title: '图片1',
  },
  {
    id: '2',
    url: 'https://picsum.photos/id/1015/1920/1080',
    title: '图片2',
  },
  {
    id: '3',
    url: 'https://picsum.photos/id/1019/1920/1080',
    title: '图片3',
  },
])

function change(index: number) {
  console.log('[ index ] >>:', index)
}
</script>

<template>
  <div class="space-y-10">
    <Carousel :list="list" height="200px" class="carousel-card" @change="change">
      <template #carousel="scoped">
        <h3 text="2xl" justify="center">
          {{ scoped.content }}
        </h3>
      </template>
    </Carousel>

    <Carousel :list="list" :interval="4000" type="card" height="200px" class="carousel-card">
      <template #carousel="scoped">
        <h3 text="2xl" justify="center">
          {{ scoped.content }}
        </h3>
      </template>
    </Carousel>

    <Carousel :list="imgs" height="320px">
      <template #carousel="scoped">
        <img :src="scoped.url" :alt="scoped.title">
      </template>
    </Carousel>
  </div>
</template>

<style scoped lang="less">
.carousel-card {
  h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  ::v-deep(.el-carousel__item:nth-child(2n)) {
    background-color: #99a9bf;
  }

  ::v-deep(.el-carousel__item:nth-child(2n + 1)) {
    background-color: #d3dce6;
  }
}
</style>
