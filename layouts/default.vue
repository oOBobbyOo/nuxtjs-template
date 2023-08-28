<template>
  <div class="min-h-screen w-full flex flex-col bg-white text-gray-700 dark:bg-black dark:text-white">
    <Header />
    <main flex flex-1 flex-col>
      <slot />
    </main>
    <Footer />
  </div>
</template>
