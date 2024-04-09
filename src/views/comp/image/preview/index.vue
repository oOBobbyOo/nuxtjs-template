<script setup lang="ts">
const sourceImages = []
const base = Math.floor(Math.random() * 60) + 10
for (let i = 0; i < 10; i++) {
  sourceImages.push({
    thumbnail: `https://picsum.photos/id/${base + i}/200/200`,
    source: `https://picsum.photos/id/${base + i}/600/600`,
    title: `Image: ${base + i}`,
  })
}

const images = reactive([...sourceImages].splice(0, 5))

const options = reactive({
  toolbar: true,
  url: 'data-source',
})

const state = reactive({
  form: {
    view: 2,
    zoom: -0.1,
    zoomTo: 0.8,
    rotate: 90,
    rotateTo: 180,
    scaleX: 1,
    scaleY: 1,
  },
  toggleOptions: [
    'button',
    'navbar',
    'title',
    'toolbar',
    'tooltip',
    'movable',
    'zoomable',
    'rotatable',
    'scalable',
    'transition',
    'fullscreen',
    'keyboard',
  ],
  options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source',
  },
})

function toggleToolbar(toolbar: boolean) {
  options.toolbar = toolbar
}

let $viewer: Viewer

function inited(viewer: Viewer) {
  $viewer = viewer
}

function toggleInline(inline: boolean) {
  state.options.inline = inline
}

function zoom(value: number) {
  $viewer.zoom(value || state.form.zoom)
}

function zoomTo() {
  $viewer.zoomTo(state.form.zoomTo)
}

function rotate(value: number) {
  $viewer.rotate(value || state.form.rotate)
}

function rotateTo() {
  $viewer.rotateTo(state.form.rotateTo)
}

// function scaleX(value: number) {
//   if (value) {
//     $viewer.scaleX(value)
//   }
//   else {
//     state.form.scaleX = -state.form.scaleX
//     $viewer.scaleX(state.form.scaleX)
//   }
// }

// function scaleY(value: number) {
//   if (value) {
//     $viewer.scaleY(value)
//   }
//   else {
//     state.form.scaleY = -state.form.scaleY
//     $viewer.scaleY(state.form.scaleY)
//   }
// }

// function move(x: number, y: number) {
//   $viewer.move(x, y)
// }

function prev() {
  $viewer.prev()
}

function next() {
  $viewer.next()
}

function play() {
  $viewer.play()
}

function stop() {
  $viewer.stop()
}

// function show() {
//   $viewer.show()
// }

function full() {
  $viewer.full()
}

function tooltip() {
  $viewer.tooltip()
}

function reset() {
  $viewer.reset()
}
</script>

<template>
  <Card title="图像预览">
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
          v-for="{ source, thumbnail, title } in images"
          :key="source"
          :src="thumbnail"
          :data-source="source"
          class="image"
          :alt="title"
        >
      </div>
    </div>

    <div>
      <h2 mb-2 text-xl>
        Component
      </h2>
      <div class="my-4 space-x-4">
        <el-button-group>
          <el-button
            :type="!state.options.inline ? 'primary' : 'default'"
            @click="toggleInline(false)"
          >
            Modal
          </el-button>
          <el-button
            :type="state.options.inline ? 'primary' : 'default'"
            @click="toggleInline(true)"
          >
            Inline
          </el-button>
        </el-button-group>
        <el-button @click="zoom(-0.1)">
          Zoom (-0.1)
        </el-button>
        <el-button @click="zoomTo">
          ZoomTo (0.8)
        </el-button>
        <el-button @click="rotate(90)">
          Rotate (90)
        </el-button>
        <el-button @click="rotateTo">
          RotateTo (180)
        </el-button>
      </div>

      <div class="my-4 space-x-4">
        <el-button-group>
          <el-button @click="prev">
            Prev
          </el-button>
          <el-button @click="next">
            Next
          </el-button>
          <el-button @click="play">
            Play
          </el-button>
          <el-button @click="stop">
            Stop
          </el-button>
        </el-button-group>
        <el-button @click="full">
          Full
        </el-button>
        <el-button @click="tooltip">
          Tooltip
        </el-button>
        <el-button @click="reset">
          Reset
        </el-button>
      </div>

      <div flex>
        <div class="mr-4 w-[20%] flex flex-col b-1 b-rd-1 dark:b-dark-50">
          <p p-4>
            Options
          </p>
          <div v-for="item in state.toggleOptions" :key="item" class="b-t-1 px-4 py-1 dark:b-dark-50">
            <el-checkbox v-model="state.options[item]" :label="item" />
          </div>
        </div>
        <div class="viewer-wrapper">
          <viewer
            class="viewer h-full"
            :options="state.options"
            :images="images"
            rebuild
            @inited="inited"
          >
            <template #default="scope">
              <figure class="h-full flex-center flex-wrap">
                <div
                  v-for="{ source, thumbnail, title } in scope.images"
                  :key="source"
                  class="image-wrapper"
                >
                  <img class="image" :src="thumbnail" :data-source="source" :alt="title">
                </div>
              </figure>
              <p pb-4 pt-2>
                <strong>Options: </strong>{{ scope.options }}
              </p>
            </template>
          </viewer>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped lang="less">
.viewer-wrapper {
  position: relative;
  background: #333;
}

.image-wrapper {
  display: inline-block;
  width: calc(33% - 100px);
  margin: 10px 10px 0;

  .image {
    width: 100%;
    height: 200px;
  }
}

.image {
  display: inline-block;
  width: calc(20% - 10px);
  margin: 5px;
  cursor: pointer;
}
</style>
