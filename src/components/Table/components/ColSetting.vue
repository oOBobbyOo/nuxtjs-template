<script setup lang="ts">
import type { ColumnProps } from '@/typings/table'

defineProps<{ colSetting: ColumnProps[] }>()

const drawerVisible = ref<boolean>(false)

function openColSetting() {
  drawerVisible.value = true
}

defineExpose({
  openColSetting,
})
</script>

<template>
  <!-- 列设置 -->
  <el-drawer v-model="drawerVisible" title="列设置" size="450px">
    <div class="table-main">
      <el-table
        :data="colSetting"
        :border="true"
        row-key="colSetting"
        default-expand-all
        :tree-props="{ children: '_children' }"
      >
        <el-table-column prop="label" align="center" label="列名" />
        <el-table-column v-slot="scope" prop="isHidden" align="center" label="隐藏">
          <el-switch v-model="scope.row.isHidden" />
        </el-table-column>
        <el-table-column v-slot="scope" prop="sortable" align="center" label="排序">
          <el-switch v-model="scope.row.sortable" />
        </el-table-column>
        <template #empty>
          <Empty description="暂无可配置列" />
        </template>
      </el-table>
    </div>
  </el-drawer>
</template>
