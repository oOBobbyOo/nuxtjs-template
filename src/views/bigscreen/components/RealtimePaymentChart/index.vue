<script setup lang="ts">
import { ScrollBoard as DvScrollBoard } from '@kjgl77/datav-vue3'

const config = reactive({
  header: ['时间', '用户', '金额'],
  data: [
    ['14:00', '张三', '1000'],
    ['14:05', '李四', '2000'],
    ['14:10', '王五', '3000'],
    ['14:15', '赵六', '4000'],
    ['14:20', '钱七', '5000'],
    ['14:25', '孙八', '6000'],
  ],
  rowNum: 5, // 表格行数
  headerHeight: 35, // 表头高度
  headerBGC: '#0f1325', // 表头背景色
  oddRowBGC: '#0f1325', // 奇数行背景色
  evenRowBGC: '#171c33', // 偶数行背景色
  index: true,
  columnWidth: [50],
  align: ['center'],
})
</script>

<template>
  <div class="real-time-payment">
    <DvScrollBoard :config="config" />
  </div>
</template>

<style scoped lang="less">
.real-time-payment {
  width: 680px;
  height: 240px;
  margin: 0 auto;
  position: relative;
  top: 60px;
}
</style>
