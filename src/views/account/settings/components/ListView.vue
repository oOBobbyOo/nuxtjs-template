<script setup lang="ts">
interface ItemProps {
  avatar?: string
  title?: string
  description?: string
  actions?: any[]
}

interface Props {
  list: ItemProps[]
}

defineProps<Props>()
</script>

<template>
  <div class="list-view">
    <ul v-if="list">
      <li v-for="item in list" :key="item.title" class="list-item">
        <div class="list-item-meta">
          <div v-if="item.avatar" class="list-item-meta-avatar">
            <Icon :icon="item.avatar" />
          </div>
          <div class="list-item-meta-content">
            <h4 class="list-item-meta-title dark:!text-white">
              {{ item.title }}
            </h4>
            <div class="list-item-meta-description dark:!text-gray-5">
              {{ item.description }}
            </div>
          </div>
        </div>
        <ul class="list-item-action">
          <li v-for="action in item.actions" :key="action.key">
            <component :is="action.component" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.list-view {
  .list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;

    &-meta {
      flex: 1;
      display: flex;
      align-items: flex-start;

      &-content {
        flex: 1;
      }

      &-avatar {
        margin-inline-end: 16px;
      }

      &-title {
        margin: 0 0 4px 0;
        color: rgba(0, 0, 0, 0.88);
        font-size: 14px;
      }
      &-description {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }

    &-action {
      flex: 0 0 auto;
      margin-inline-start: 48px;
    }
  }
}
</style>
