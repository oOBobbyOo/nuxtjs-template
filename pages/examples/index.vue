<script setup lang="ts">
const { data } = await useFetch('/api/examples')

const examples = computed(() => data.value?.examples || [])
</script>

<template>
  <section relative px-6 pb-16 pt-8 sm:pb-32>
    <div relative grid grid-cols-12 gap-8>
      <ExamplesSideBar :navigation="examples" />
      <div relative col-span-10 lg:col-span-8>
        <section relative flex flex-col>
          <ul grid grid-cols-1 mt-8 gap-8 sm:grid-cols-2 xl:grid-cols-3>
            <li v-for="example in examples" :key="example.key">
              <ExamplesCard :example="example" />
            </li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>
