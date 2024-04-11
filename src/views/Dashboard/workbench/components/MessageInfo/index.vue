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
    content: '由 <i>你</i> 申请的 <span>团建费用报销流程</span>',
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
  {
    id: 4,
    content: '由 <i>成员xxx</i> 发起的 <span>加班调休流程</span> 正在审批中',
    time: '2024-04-10 17:31:15',
    type: 'pending',
    status: '审批中',
  },
  {
    id: 5,
    content: '由 <i>成员xxx</i> 申请的 <span>年度加薪流程</span>',
    time: '2024-04-10 17:31:15',
    type: 'success',
    status: '已审批',
  },
]
</script>

<template>
  <Card title="站内信">
    <el-scrollbar height="200px">
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
    </el-scrollbar>
  </Card>
</template>

<style scoped lang="less">
.message-list {
  @apply px-2;

  .item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
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
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }

    .status {
      min-width: 50px;
      padding: 2px 4px;
      margin: 5px 10px;
      font-size: 12px;
      color: #999;
      text-align: center;
      white-space: nowrap;
      border: 1px solid #ccc;
      border-radius: 4px;

      &.success {
        color: #16a34a;
        border: 1px solid #16a34a;
      }

      &.reject {
        color: #ef4444;
        border: 1px solid #ef4444;
      }

      &.pending {
        color: #eab308;
        border: 1px solid #eab308;
      }
    }
  }
}
</style>
