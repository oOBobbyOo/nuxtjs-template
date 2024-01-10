<script setup lang="ts">
import SalesChart from './components/SalesCart/index.vue'
import ViewsChart from './components/ViewsCart/index.vue'
import Trend from './components/Trend/index.vue'

import { useRequest } from '@/hooks/web/useRequest'
import { getAnalysisChart } from '@/api/dashboard'

const { data, loading } = useRequest(() => getAnalysisChart())

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 6,
  style: { marginBottom: '16px' },
}
</script>

<template>
  <div>
    <div v-if="loading">
      loading
    </div>

    <div v-else>
      <el-row :gutter="16">
        <el-col v-bind="topColResponsiveProps">
          <StatisticCard title="总销售额" :value="126560" icon="tabler:coin-yen" tooltip="指标说明">
            <template #body>
              <Trend
                label="周同比"
                value="12%"
                icon="material-symbols:arrow-drop-up"
                color="#22c55e"
              />
              <Trend
                label="日同比"
                value="12%"
                icon="material-symbols:arrow-drop-down"
                color="#f43f5e"
              />
            </template>
            <template #footer>
              <Trend label="周销售额" value="￥1,234" />
              <Trend label="日销售额" value="￥1,234" />
            </template>
          </StatisticCard>
        </el-col>

        <el-col v-bind="topColResponsiveProps">
          <StatisticCard
            title="总访问量"
            :value="126560"
            icon="material-symbols:planner-review"
            tooltip="指标说明"
          >
            <template #body>
              <Trend
                label="周同比"
                value="12%"
                icon="material-symbols:arrow-drop-up"
                color="#16a34a"
              />
              <Trend
                label="日同比"
                value="12%"
                icon="material-symbols:arrow-drop-down"
                color="#e11d48"
              />
            </template>
            <template #footer>
              <Trend label="周访问量" value="1,234" />
              <Trend label="日访问量" value="1,234" />
            </template>
          </StatisticCard>
        </el-col>

        <el-col v-bind="topColResponsiveProps">
          <StatisticCard
            title="支付笔数"
            :value="126560"
            icon="fluent:payment-16-regular"
            tooltip="指标说明"
          >
            <template #body>
              <Trend
                label="周同比"
                value="12%"
                icon="material-symbols:arrow-drop-up"
                color="#16a34a"
              />
              <Trend
                label="日同比"
                value="12%"
                icon="material-symbols:arrow-drop-down"
                color="#e11d48"
              />
            </template>
            <template #footer>
              <Trend label="累计订单量" value="10,000" />
              <Trend label="转化率" value="60%" />
            </template>
          </StatisticCard>
        </el-col>

        <el-col v-bind="topColResponsiveProps">
          <StatisticCard title="总用户量" :value="126560" icon="ph:users" tooltip="指标说明">
            <template #body>
              <Trend
                label="周同比"
                value="12%"
                icon="material-symbols:arrow-drop-up"
                color="#16a34a"
              />
              <Trend
                label="日同比"
                value="12%"
                icon="material-symbols:arrow-drop-down"
                color="#e11d48"
              />
            </template>
            <template #footer>
              <Trend label="周新增用户" value="1,234" />
              <Trend label="日新增用户" value="1,234" />
            </template>
          </StatisticCard>
        </el-col>
      </el-row>

      <Card title="销售额" class="mb-[16px]">
        <SalesChart :data="data?.salesData" />
      </Card>

      <Card title="访问量">
        <ViewsChart :data="data?.viewsData" />
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
