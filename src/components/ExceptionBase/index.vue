<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'

defineOptions({ name: 'ExceptionBase' })

const props = defineProps<Props>()

interface Props {
  status: string
  title?: string
  subTitle?: string
}

const icon = computed(() => {
  const codeMap = new Map()
  codeMap.set('403', 'no-permission|svg')
  codeMap.set('404', 'not-found|svg')
  codeMap.set('500', 'service-error|svg')
  return codeMap.get(props.status)
})

const { t } = useI18n()

const router = useRouter()

function backHome() {
  router.push('/')
}
</script>

<template>
  <div flex-center flex-1 flex-col>
    <el-result :title="title" :sub-title="subTitle">
      <template #icon>
        <Icon class="text-blue" size="400" :icon="icon" />
      </template>
      <template #extra>
        <el-button type="primary" @click="backHome">
          {{ t('common.backHome') }}
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped></style>
