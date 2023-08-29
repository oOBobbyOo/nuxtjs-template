<script setup lang="ts">
useHead({ title: 'Home' })
</script>

<template>
  <div flex-center flex-1 flex-col>
    <h1 text-center>
      <span class="text from-cyan-500 to-blue-500">
        {{ $t('welcome') }}
      </span>
      <span class="text from-sky-500 to-indigo-500">NUXT 3</span>
      <span class="text from-violet-500 to-fuchsia-500">STARTER</span>
    </h1>
  </div>
</template>

<style scoped lang="scss">
.text {
  --at-apply: my-2 text-6xl block font-black uppercase drop-shadow-xl bg-gradient-to-r bg-clip-text text-transparent;
}
</style>
