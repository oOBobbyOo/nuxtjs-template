<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <div relative flex-1>
    <section relative px-6 pb-16 pt-8 sm:pb-32>
      <div>
        sidebar
      </div>

      <div relative grid grid-cols-12 gap-8>
        <div relative col-span-10 lg:col-span-8>
          <section relative flex flex-col>
            <template v-if="page">
              <ContentRenderer :value="page" />
            </template>
            <template v-else>
              <div class="grid min-h-[400px] place-items-center">
                <div class="p-10 text-center">
                  <h3 class="mb-2 text-2xl font-bold">
                    404
                  </h3>
                  <p class="mb-6 text-sm text-gray-600">
                    Document or page not found
                  </p>
                  <NuxtLink href="/">
                    Back to home
                  </NuxtLink>
                </div>
              </div>
            </template>
          </section>
        </div>
      </div>
    </section>

    <!-- <DocsNavBar />
    <section relative px-6 pb-16 pt-8 sm:pb-32>
      <div relative grid grid-cols-12 gap-8>
        <DocsSideBar />
        <div relative col-span-10 lg:col-span-8>
          <section relative flex flex-col>
            <ContentDoc>
              <template #not-found>
                <div class="grid min-h-[400px] place-items-center">
                  <div class="p-10 text-center">
                    <h3 class="mb-2 text-2xl font-bold">
                      404
                    </h3>
                    <p class="mb-6 text-sm text-gray-600">
                      Document or page not found
                    </p>
                    <NuxtLink href="/">
                      Back to home
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </ContentDoc>
          </section>
        </div>
      </div>
    </section> -->
  </div>
</template>
