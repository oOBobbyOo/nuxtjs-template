<script setup lang="ts">
const props = withDefaults(defineProps<{
  code: string
  isHovered: boolean
}>(), {
  code: '',
  isHovered: false,
})

const copied = ref(false)
const { copy, isSupported } = useClipboard({ legacy: true })

function copyCode() {
  copy(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1000)
}
</script>

<template>
  <button v-if="isSupported" :class="[isHovered ? 'copy-button show' : 'copy-button']" @click="copyCode()">
    <span class="icon-wrapper">
      <Icon :name="copied ? 'teenyicons:tick-outline' : 'ph:copy'" width="18" height="18" :class="[copied ? 'icon copied' : 'icon']" />
    </span>
    <span sr-only>Copy to clipboard</span>
  </button>
</template>

<style scoped lang="scss">
button {
  --at-apply: b-rd-[3px] m-1 p-1 scale-75 opacity-0 transition-all-200 hover:bg-gray-200 hover:dark:bg-gray-800;

  &:focus {
    --color-blue-500: #1aadff;
    box-shadow: 0 0 0 2px var(--color-blue-500);
  }

  &.show {
    --at-apply: opacity-100 scale-100;
  }
}

.copy-button {
  --at-apply: absolute bottom-0 inset-e-0;

  .icon-wrapper {
    display: block;
    height: 18px;
    position: relative;
    width: 18px;

    .icon {
      display: block;
      position: absolute;
    }
  }
}
</style>
