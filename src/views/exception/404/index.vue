<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()
</script>

<template>
  <ExceptionBase status="404" title="404" :sub-title="t('routes.exception.exception404')" />
</template>
