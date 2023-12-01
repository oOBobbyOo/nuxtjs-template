<script setup lang="ts">
interface Props {
  visible: boolean
  title?: string
  fullscreen?: boolean
  maxHeight?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '',
  fullscreen: true,
  maxHeight: 400,
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
}>()

function handleClose() {
  emit('update:visible', false)
  emit('close')
}

const slots = useSlots()
const attrs = useAttrs()

const isFullscreen = ref(false)

function toggleFullscreen() {
  isFullscreen.value = !unref(isFullscreen)
}

const dialogHeight = ref(props.maxHeight)

watch(
  () => isFullscreen.value,
  async (val: boolean) => {
    await nextTick()
    if (val) {
      const windowHeight = document.documentElement.offsetHeight
      dialogHeight.value = `${windowHeight - 55 - 30 - (slots.footer ? 55 : 0)}px`
    }
    else {
      dialogHeight.value = props.maxHeight
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <el-dialog
    v-bind="attrs"
    :model-value="visible"
    destroy-on-close
    lock-scroll
    draggable
    top="0"
    :fullscreen="isFullscreen"
    :show-close="false"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <template #header="{ close }">
      <div class="relative h-full flex items-center justify-between">
        <slot name="title">
          {{ title }}
        </slot>
        <div
          class="absolute right-0 top-[50%] h-full flex translate-y-[-50%] items-center justify-between"
        >
          <Icon
            v-if="fullscreen"
            class="mr-10px cursor-pointer"
            :icon="isFullscreen ? 'radix-icons:exit-full-screen' : 'radix-icons:enter-full-screen'"
            color="var(--el-color-info)"
            hover-color="var(--el-color-primary)"
            @click="toggleFullscreen"
          />
          <Icon
            class="cursor-pointer"
            icon="ep:close"
            hover-color="var(--el-color-primary)"
            color="var(--el-color-info)"
            @click="close"
          />
        </div>
      </div>
    </template>

    <el-scrollbar :height="dialogHeight">
      <slot />
    </el-scrollbar>

    <template v-if="slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<style lang="less">
.el-overlay-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-dialog {
  margin: 0 !important;

  &__header {
    height: 55px;
    padding: 0 15px;
    margin-right: 0 !important;
    border-bottom: 1px solid var(--el-border-color);
  }

  &__body {
    padding: 15px !important;
  }

  &__footer {
    padding: 15px;
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
