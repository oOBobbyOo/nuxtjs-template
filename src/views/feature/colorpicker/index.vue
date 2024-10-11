<script setup lang="ts">
import type Pickr from '@simonwep/pickr'
import { useThemeStore } from '@/stores/modules/theme'

const themeStore = useThemeStore()

// EyeDropper
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

// Pickr
const pickrColor = ref(themeStore.themeColor)

const classicTheme = ref<Pickr.Theme>('classic')
const monolithTheme = ref<Pickr.Theme>('monolith')
const nanoTheme = ref<Pickr.Theme>('nano')
</script>

<template>
  <div class="space-y-4">
    <PageCard class="space-y-4 !rounded-md">
      <h1 class="text-xl font-bold">
        系统级拾色器
      </h1>
      <p>
        可将取色器移动到浏览器窗口中任意位置，即可获取到颜色值
      </p>

      <div class="flex-center flex-col">
        <el-button type="success" @click="handleEyeDropper">
          打开拾色器
        </el-button>
      </div>

      <Ribbon :color="color">
        {{ color }}
      </Ribbon>
    </PageCard>

    <PageCard class="space-y-4 !rounded-md">
      <h1 class="text-xl font-bold">
        Pickr 拾色器
      </h1>
      <p>
        扁平、简单、多主题、响应灵敏且可破解的颜色选择器库。支持 alpha 通道、rgba、hsla、hsva 等！支持三种不同主题模式。
      </p>

      <div class="flex-center flex-col space-y-4">
        <div class="flex-center space-x-4">
          <div class="flex-center flex-col space-y-4">
            <button class="b-b-2 b-b-blue-6 bg-blue-1 p-2">
              classic
            </button>
            <ColorPickr v-model="pickrColor" :theme="classicTheme" />
          </div>

          <div class="flex-center flex-col space-y-4">
            <button class="b-b-2 b-b-blue-6 bg-blue-1 p-2">
              monolith
            </button>
            <ColorPickr v-model="pickrColor" :theme="monolithTheme" />
          </div>

          <div class="flex-center flex-col space-y-4">
            <button class="b-b-2 b-b-blue-6 bg-blue-1 p-2">
              nano
            </button>
            <ColorPickr v-model="pickrColor" :theme="nanoTheme" />
          </div>
        </div>
      </div>

      <Ribbon :color="pickrColor">
        {{ pickrColor }}
      </Ribbon>
    </PageCard>
  </div>
</template>

<style scoped lang="less"></style>
