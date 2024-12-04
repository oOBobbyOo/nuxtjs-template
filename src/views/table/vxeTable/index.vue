<script setup lang="ts">
import { useTable } from '@/hooks/web/useTable'
import { getAdvancedTable } from '@/api/table'

const {
  loading,
  tableData,
} = useTable(getAdvancedTable, {
  pageSize: 50,
})

const stateMap = {
  close: '关闭',
  running: '进行中',
  online: '已上线',
  error: '异常',
}
function getStatus(key: keyof typeof stateMap) {
  return stateMap[key]
}
</script>

<template>
  <div class="mb-3 b-rd-1 bg-white p-6 space-y-6 dark:bg-dark">
    <vxe-table
      border size="small" height="740" :column-config="{ resizable: true }"
      :row-config="{ isCurrent: true, isHover: true }" :scroll-y="{ enabled: true, gt: 0 }" :loading="loading"
      :data="tableData"
    >
      <vxe-column type="seq" width="70" fixed="left" />
      <vxe-column field="title" title="标题" />
      <vxe-column field="image" title="图片" width="100">
        <template #default="{ row }">
          <el-image
            :src="row.image" lazy :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
            :preview-src-list="[row.image]" fit="cover"
          />
        </template>
      </vxe-column>
      <vxe-column field="state" title="状态">
        <template #default="{ row }">
          {{ getStatus(row.state) }}
        </template>
      </vxe-column>
      <vxe-column field="created_at" title="创建时间" />
      <vxe-column field="updated_at" title="更新时间" />
    </vxe-table>
  </div>
</template>
