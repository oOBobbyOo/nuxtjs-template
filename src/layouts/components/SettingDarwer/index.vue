<script setup lang="ts">
import { useDrawer } from '@/hooks/web/useDrawer'

defineOptions({ name: 'SettingDrawer' })

const { visible, openDrawer, closeDrawer } = useDrawer()
</script>

<template>
  <div h-full flex-center cursor-pointer pl-2 @click="openDrawer">
    <Icon icon="ion:settings-outline" />
    <Drawer v-model:visible="visible" title="主题配置">
      <template #default>
        default
      </template>
      <template #footer>
        <el-button @click="closeDrawer">
          cancel
        </el-button>
        <el-button type="primary">
          confirm
        </el-button>
      </template>
    </Drawer>
  </div>
</template>

<style scoped></style>
