<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { getTimeState } from '@/utils/time'

import { useRequest } from '@/hooks/web/useRequest'
import { getWeather } from '@/api/dashboard'

const { getUserInfo } = useUserStore()

const title = computed(() => {
  return `${getTimeState()} ，${getUserInfo?.realName}，开始您愉快的工作吧！`
})

const { data, loading } = useRequest(() => getWeather())

const weather = computed(() => {
  const value = data.value
  const { city, data: res, tip } = value
  return {
    temperature: `${city} ${res.date}(${res.week}) ${res.type} · ${res.low}~${res.high} · ${res.fengxiang}(风力${res.fengli}) 晚上：${res.night.type} · ${res.night.fengxiang}(风力${res.night.fengli})`,
    tip: `温馨提示：${tip}`,
  }
})
</script>

<template>
  <Card>
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-wrap items-center">
        <el-avatar
          v-if="getUserInfo?.avatar"
          :size="72"
          :src="getUserInfo?.avatar"
          class="mb-4 mr-4 sm:mb-0"
        />
        <div class="flex flex-1 flex-col justify-center">
          <span class="m-0 text-truncate text-sm font-medium md:text-base">{{ title }}</span>
          <!-- <span class="mt-2 text-sm">今日晴，20℃ - 32℃</span> -->
          <span v-if="!loading" class="mt-2 break-words text-sm">{{ weather.temperature }}</span>
          <span v-if="!loading" class="mt-2 text-sm">{{ weather.tip }}</span>
        </div>
      </div>
      <div class="mt-6 flex flex-1 items-center justify-start lg:mt-0 lg:justify-end space-x-16">
        <div class="flex flex-col text-right">
          <span class="text-sm text-gray-4">待办</span>
          <span class="text-2xl">2/100</span>
        </div>
        <div class="flex flex-col text-right">
          <span class="text-sm text-gray-4">项目</span>
          <span class="text-2xl">8</span>
        </div>
        <div class="flex flex-col text-right">
          <span class="text-sm text-gray-4">团队</span>
          <span class="text-2xl">30</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
