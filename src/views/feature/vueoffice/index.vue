<script setup lang="ts">
// @see https://501351981.github.io/vue-office/examples/docs/guide

// PDF 预览
import VueOfficePdf from './components/VueOfficePdf.vue'

// Excel 预览
import VueOfficeExcel from './components/VueOfficeExcel.vue'

// Docs 预览
import VueOfficeDocx from './components/VueOfficeDocx.vue'

const activeName = ref('pdf')

const tabItems = [
  {
    label: 'PDF 文件预览',
    name: 'pdf',
    component: VueOfficePdf,
  },
  {
    label: 'Excel 文件预览',
    name: 'excel',
    component: VueOfficeExcel,
  },
  {
    label: 'Docx 文件预览',
    name: 'docx',
    component: VueOfficeDocx,
  },
]
</script>

<template>
  <PageCard>
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="item in tabItems" :key="item.name" :label="item.label" :name="item.name">
        <component :is="item.component" />
      </el-tab-pane>

      <!-- <el-tab-pane name="pdf" label="PDF 文件预览">
        <VueOfficePdf />
      </el-tab-pane>
      <el-tab-pane name="excel" label="Excel 文件预览">
        <VueOfficeExcel />
      </el-tab-pane>
      <el-tab-pane name="docx" label="Docx 文件预览">
        <VueOfficeDocx />
      </el-tab-pane> -->
    </el-tabs>
  </PageCard>
</template>

<style scoped lang="less">
::v-deep(.el-tabs__content) {
  height: calc(100vh - 290px);
}

::v-deep(.el-tab-pane) {
  height: 100%;
}
</style>
