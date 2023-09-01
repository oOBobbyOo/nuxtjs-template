<script setup lang="ts">
const showSideBar = ref(true)
const docsQuery = queryContent('docs')
const { isRouteActive } = useRouteActive()
</script>

<template>
  <aside col-span-2 hidden overflow-x-hidden overflow-y-auto pb-8 lg:sticky lg:top-16 lg:block lg:self-start lg:pt-8 lg:-mt-8 sm:-mb-24>
    <ContentNavigation v-slot="{ navigation }" :query="docsQuery">
      <ul v-if="showSideBar" px-1>
        <template v-for="nav in navigation" :key="nav._path">
          <li v-for="link in nav?.children" :key="link._path">
            <NuxtLink
              v-for="child in link?.children" :key="child._path" :to="child._path" #="{ isActive }" class="w-full flex py-1.5" :class="{
                'font-semibold !pt-0': isRouteActive(child._path),
                'hover:font-semibold': !isRouteActive(child._path),
              }"
            >
              <div inline-flex items-center>
                <Icon :name="child.icon" mr-1 h-5 w-5 />
                <div flex flex-col>
                  <span>{{ child.title }}</span>
                  <span
                    class="inset-x-0 h-0.5 -bottom-1" :class="{
                      'bg-gradient-to-r from-green-400 to-teal-400': isActive,
                    }"
                  />
                </div>
              </div>
            </NuxtLink>
          </li>
        </template>
      </ul>
    </ContentNavigation>
  </aside>
</template>

<style scoped></style>
