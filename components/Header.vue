<template>
  <header class="fixed left-0 top-0 h-[64px] max-h-[64px] w-full flex-center border-b border-gray-950/10 px-4 dark:border-gray-50/[0.2]">
    <!-- logo -->
    <div class="logo h-10 w-10">
      <NuxtLink to="/">
        <img src="@/assets/images/nuxt.svg">
      </NuxtLink>
    </div>
    <!-- nav -->
    <NavBar />
    <!-- icon -->
    <div class="flex-center space-x-3">
      <NuxtLink to="/">
        <Icon name="uil:github" size="20" />
      </NuxtLink>
      <DarkToggle />
    </div>
  </header>
</template>
