<script setup lang="ts">
const convas = ref()

const { poof } = useConfettis(convas)

function onButtonClick() {
  poof()
}
</script>

<template>
  <div flex-center flex-col>
    <button class="center z-1 btn" @click="onButtonClick">
      Click me
    </button>

    <canvas ref="convas" class="absolute bottom-0 top-0 z-0 h-full w-full" />
  </div>
</template>
