<script setup lang="ts">
const activities = [
  {
    content: '皮特 编写项目说明文档',
    timestamp: '2014-01-12 20:46',
    size: 'large',
    type: 'primary',
  },
  {
    content: '威廉 发布了新版本',
    timestamp: '2023-12-03 20:46',
    color: '#22c55e',
  },
  {
    content: '克里斯 提交一个新功能',
    timestamp: '2013-11-03 20:46',
    size: 'large',
    color: '#ef4444',
  },
  {
    content: '杰克 修复了一个bug',
    timestamp: '2013-10-18 11:37',
    type: 'warning',
    hollow: true,
  },
  {
    content: 'Henry 创建了项目！',
    timestamp: '2023-09-28 15:22',
  },
]
</script>

<template>
  <Card title="最新动态">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </Card>
</template>

<style scoped></style>
