<script setup lang="ts">
const value = ref(new Date())
</script>

<template>
  <Card>
    <el-calendar v-model="value">
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(2).join() }}
        </p>
      </template>
    </el-calendar>
  </Card>
</template>

<style scoped></style>
