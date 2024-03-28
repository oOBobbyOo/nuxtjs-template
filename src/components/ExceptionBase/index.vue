<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { useThemeStore } from '@/stores/modules/theme'

defineOptions({ name: 'ExceptionBase' })

const props = defineProps<Props>()

interface Props {
  status: '403' | '404' | '500'
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

const themeStore = useThemeStore()
const themeColor = computed(() => themeStore.themeColor)

const router = useRouter()

function backHome() {
  router.push('/')
}
</script>

<template>
  <div flex-center flex-1 flex-col>
    <el-result :title="title" :sub-title="subTitle">
      <template #icon>
        <Icon class="text-color" size="400" :icon="icon" />
      </template>
      <template #extra>
        <el-button type="primary" @click="backHome">
          {{ t('common.backHome') }}
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped lang="less">
.text-color {
  color: v-bind(themeColor);
}
</style>
