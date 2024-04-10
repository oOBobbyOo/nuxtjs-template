<script setup lang="ts">
const messages = [
  {
    id: 1,
    content: '由 <i>成员xxx</i> 发起的 <span>请假流程</span> 需要您审批',
    time: '2024-04-10 17:31:15',
    type: 'success',
    status: '已审批',
  },
  {
    id: 2,
    content: '由 <i>你</i> 申请的 <span>团建费用流程</span>',
    time: '2024-04-10 17:31:15',
    type: 'reject',
    status: '已拒绝',
  },
  {
    id: 3,
    content: '由 <i>你</i> 申请的 <span>车费报销流程</span> 正在审批中',
    time: '2024-04-10 17:31:15',
    type: 'unread',
    status: '未读',
  },
]
</script>

<template>
  <Card title="站内信">
    <div class="message-list">
      <div v-for="item in messages" :key="item.id" class="item">
        <div class="info">
          <div class="content" v-html="item.content" />
          <div class="time">
            {{ item.time }}
          </div>
        </div>
        <div class="status" :class="item.type">
          {{ item.status }}
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped lang="less">
.message-list {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }

    .info {
      font-size: 14px;
      .content {
        ::v-deep(i) {
          font-style: normal;
          font-weight: bold;
        }
        ::v-deep(span) {
          color: #3b82f6;
        }
      }

      .time {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
      }
    }

    .status {
      margin: 5px 10px;
      font-size: 12px;
      color: #999;
      padding: 2px 4px;
      border: 1px solid #ccc;
      border-radius: 4px;
      white-space:nowrap;
      &.success {
        color: #16a34a;
        border: 1px solid #16a34a;
      }
      &.reject {
        color: #ef4444;
        border: 1px solid #ef4444;
      }
    }
  }
}
</style>
