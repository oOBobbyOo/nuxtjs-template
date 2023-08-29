<template>
  <header class="sticky top-0 z-30 h-[64px] max-h-[64px] w-full border-b border-gray-950/10 px-6 lg:relative dark:border-gray-50/[0.2]">
    <div class="grid grid-cols-6 h-full w-full items-center justify-center gap-3">
      <div lg:hidden>
        <button>
          <Icon name="carbon:menu" size="20" />
          <span sr-only>Menu</span>
        </button>
      </div>
      <!-- logo -->
      <div col-span-4 flex justify-center lg:col-span-1 lg:justify-start>
        <div class="logo h-10 w-10">
          <NuxtLink to="/">
            <img src="@/assets/images/nuxt.svg">
          </NuxtLink>
        </div>
      </div>
      <!-- nav -->
      <NavBar />
      <!-- icon -->
      <div class="flex-center justify-end">
        <NuxtLink to="/">
          <Icon name="uil:github" size="20" mr-4 />
        </NuxtLink>
        <DarkToggle />
      </div>
    </div>
  </header>
</template>
