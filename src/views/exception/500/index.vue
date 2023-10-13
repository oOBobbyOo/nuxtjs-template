<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()
</script>

<template>
  <ExceptionBase status="500" title="500" :sub-title="t('routes.exception.exception500')" />
</template>
