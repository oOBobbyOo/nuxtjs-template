<script setup lang="ts">
const sourceImages = []
const base = Math.floor(Math.random() * 60) + 10
for (let i = 0; i < 10; i++) {
  sourceImages.push({
    thumbnail: `https://picsum.photos/id/${base + i}/200/200`,
    source: `https://picsum.photos/id/${base + i}/600/600`,
    alt: `Image: ${base + i}`,
  })
}

const images = reactive([...sourceImages].splice(0, 5))

const options = reactive({
  toolbar: true,
  url: 'data-source',
})

function toggleToolbar(toolbar: boolean) {
  options.toolbar = toolbar
}
</script>

<template>
  <Card title="图像预览" class="h-full">
    <div class="mb-4">
      <h2 text-xl>
        Directive
      </h2>
      <el-button-group class="my-4">
        <el-button :type="options.toolbar ? 'primary' : 'default'" @click="toggleToolbar(true)">
          show toolbar
        </el-button>
        <el-button :type="!options.toolbar ? 'primary' : 'default'" @click="toggleToolbar(false)">
          hide toolbar
        </el-button>
      </el-button-group>
      <div v-viewer="options" class="flex flex-wrap">
        <img
          v-for="{ source, thumbnail, alt } in images"
          :key="source"
          :src="thumbnail"
          :data-source="source"
          class="image"
          :alt="alt"
        >
      </div>
    </div>

    <div class="mb-4">
      <h2 mb-2 text-xl>
        Component
      </h2>
      <viewer :options="options" :images="images" class="flex flex-wrap">
        <template #default="scope">
          <img
            v-for="{ source, thumbnail, alt } in scope.images"
            :key="source"
            :src="thumbnail"
            :data-source="source"
            class="image"
            :alt="alt"
          >
        </template>
      </viewer>
    </div>
  </Card>
</template>

<style scoped lang="less">
.image {
  width: calc(20% - 10px);
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}
</style>
