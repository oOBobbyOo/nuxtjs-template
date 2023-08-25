<script setup lang="ts">
const router = useRouter()
const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment, decrement, reset } = counterStore
</script>

<template>
  <div w-full flex-center flex-col>
    <div i-twemoji:waving-hand mb-3 inline-block animate-shake-x animate-duration-5000 text-4xl />
    <div m="y-3">
      Double: {{ doubleCount }}
    </div>
    <div inline-flex m="y-3">
      <button rounded-full p-2 btn @click="decrement()">
        <div i-carbon-subtract />
      </button>
      <div font="mono" min-w="15" m-auto inline-block text-center>
        {{ count }}
      </div>
      <button rounded-full p-2 btn @click="increment()">
        <div i-carbon-add />
      </button>
    </div>
    <button m-3 text-sm btn @click="reset()">
      Reset
    </button>
    <button text-sm btn m="3 t8" @click="router.back()">
      Back
    </button>
  </div>
</template>
