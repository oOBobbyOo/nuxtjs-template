<script setup lang="ts">
import type { Slots, TabProps } from './types'
import TabButtonBg from './TabButtonBg.vue'

defineOptions({ name: 'TabButton' })

defineProps<TabProps>()

defineSlots<Slots>()
</script>

<template>
  <div
    class="tab-button relative inline-flex cursor-pointer items-center justify-center gap-16px whitespace-nowrap px-24px py-6px -mr-18px"
    :class="[{ 'tab-active': active }]"
  >
    <div class="tab-bg pointer-events-none absolute left-0 top-0 h-full w-full -z-1">
      <TabButtonBg />
    </div>
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
    <div class="tab-divider absolute right-7px h-16px w-1px bg-#1f2225 dark:bg-white/90" />
  </div>
</template>

<style scoped lang="less">
.tab-button {
  .tab-bg {
    color: transparent;
  }

  &:hover {
    z-index: 9;

    .tab-bg {
      color: var(--hb-tab-hover-bg-color);
    }

    .tab-divider {
      opacity: 0;
    }
  }

  &.tab-active {
    z-index: 10;
    // color: var(--hb-tab-active-color);
    color: var(--el-color-primary);

    .tab-bg {
      color: var(--hb-tab-active-bg-color);
    }

    .tab-divider {
      opacity: 0;
    }
  }
}
</style>
