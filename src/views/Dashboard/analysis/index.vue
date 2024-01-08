<script setup lang="ts">
import SalesChart from './components/SalesChart.vue'
import ViewsChart from './components/ViewsChart.vue'
import { useRequest } from '@/hooks/web/useRequest'
import { getAnalysisChart } from '@/api/dashboard'

const { data, loading } = useRequest(() => getAnalysisChart())
</script>

<template>
  <div>
    <div v-if="loading">
      loading
    </div>

    <div v-else class="space-y-4">
      <Card title="销售额">
        <SalesChart :sales-data="data?.salesData || []" :style="{ height: '400px' }" />
      </Card>

      <Card title="访问量">
        <ViewsChart :views-data="data?.viewsData || []" :style="{ height: '400px' }" />
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
