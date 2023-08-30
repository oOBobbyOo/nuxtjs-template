<template>
  <nav hidden justify-center lg:col-span-4 lg:flex lg:gap-x-8 xl:gap-x-10>
    <NuxtLink to="/docs/getting-started/installation" class="link u-text-gray-600">
      Docs
    </NuxtLink>

    <NuxtLink to="/examples" class="link u-text-gray-600">
      Examples
    </NuxtLink>

    <NuxtLink to="/count" class="link u-text-gray-600">
      Count
    </NuxtLink>

    <NuxtLink to="/about" class="link u-text-gray-600">
      About
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.link {
  --at-apply: rd text-sm lg:text-base px-4 py-2 line-height-6 transition;
  &:hover {
    background-color: #f4f4f5
  }
}

.dark {
  .link {
    &:hover {
      background-color: #18181b
    }
  }
}

.router-link-active {
  background-color: #f4f4f5;
  box-shadow: 0 0 #0000,0 0 #0000,inset 0 2px 4px #0000000d;
  font-weight: 600;
}

.dark .router-link-active {
  color: #fafafa;
  background-color: #18181b
}
</style>
