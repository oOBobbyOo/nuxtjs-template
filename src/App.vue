<script setup lang="ts">
import { useLocale } from '@/hooks/web/useLocale'

const { getElLocale } = useLocale()
</script>

<template>
  <el-config-provider :locale="getElLocale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
