<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()
</script>

<template>
  <ExceptionBase status="403" title="403" :sub-title="t('routes.exception.exception403')" />
</template>
