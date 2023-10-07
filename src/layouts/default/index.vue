<script setup lang="ts"></script>

<template>
  <div>
    default layout
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped></style>
