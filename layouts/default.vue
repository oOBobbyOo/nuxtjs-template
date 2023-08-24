<template>
  <div class="min-h-screen w-full flex flex-col bg-white text-gray-950 dark:bg-black dark:text-white">
    <Header />
    <div class="w-full flex flex-1 pt-[64px]">
      <slot />
    </div>
    <Footer />
  </div>
</template>
