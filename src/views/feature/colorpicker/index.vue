<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme'

const themeStore = useThemeStore()

const color = ref(themeStore.themeColor)

async function handleEyeDropper() {
  // @see https://developer.mozilla.org/zh-CN/docs/Web/API/EyeDropper
  if (!(window as any).EyeDropper) {
    throw new Error('你的浏览器不支持 EyeDropper API')
    return
  }

  const eyeDropper = new (window as any).EyeDropper()
  try {
    const result = await eyeDropper.open()
    console.log('[ result ] >>:', result)

    color.value = result.sRGBHex
  }
  catch (error) {
    console.log('[ error ] >>:', error)
  }
}
</script>

<template>
  <div>
    <PageCard class="space-y-4 !rounded-md">
      <h1 class="text-xl font-bold">
        系统级拾色器
      </h1>
      <p>
        可将取色器移动到浏览器窗口中任意位置，即可获取到颜色值
      </p>

      <el-button type="success" @click="handleEyeDropper">
        打开拾色器
      </el-button>

      <Ribbon :color="color">
        {{ color }}
      </Ribbon>
    </PageCard>
  </div>
</template>

<style scoped lang="less">

</style>
