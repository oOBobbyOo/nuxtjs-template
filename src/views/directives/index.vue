<script setup lang="ts">
const state = reactive({
  debounce: '',
  copyData: '',
})

function throttleFn() {
  ElMessage.success('我是节流触发的事件 🍍🍓🍌')
}

function debounceFn() {
  ElMessage.success('我是防抖触发的事件 🍍🍓🍌')
}
</script>

<template>
  <Card title="自定义指令">
    <div>
      <span class="my-2 block">v-throttle 指令：</span>
      <el-button
        v-throttle="{
          event: 'click',
          fn: throttleFn,
        }"
        type="primary"
      >
        节流按钮 (每隔0.5S秒后执行)
      </el-button>
    </div>

    <el-divider border-style="dashed" />

    <div>
      <span class="my-2 block">v-debounce 指令：</span>
      <div>
        <el-tag type="info">
          延迟防抖：
        </el-tag>
        <el-input
          v-model="state.debounce"
          v-debounce="{
            event: 'input',
            fn: debounceFn,
            delay: 1000,
          }"
          class="my-2"
          placeholder="请输入内容"
        />
      </div>

      <div>
        <el-tag type="info">
          立即防抖：
        </el-tag>
        <el-input
          v-model="state.debounce"
          v-debounce="{
            event: 'input',
            fn: debounceFn,
            delay: 1000,
            immediate: true,
          }"
          class="my-2"
          placeholder="请输入内容"
        />
      </div>

      <el-button
        v-debounce="{
          event: 'click',
          fn: debounceFn,
          delay: 1000,
        }"
        type="primary"
      >
        防抖按钮 (每隔1S秒后执行)
      </el-button>
    </div>

    <el-divider border-style="dashed" />

    <div>
      <span class="my-2 block">v-copy 指令：</span>
      <el-input v-model="state.copyData" placeholder="请输入需要复制的内容">
        <template #append>
          <el-button v-copy="state.copyData">
            复制
          </el-button>
        </template>
      </el-input>

      <span class="my-2 block">v-copy-to-clipboard 指令：</span>
      <el-input v-model="state.copyData" placeholder="请输入需要复制的内容">
        <template #append>
          <el-button v-copy-to-clipboard="state.copyData">
            复制
          </el-button>
        </template>
      </el-input>
    </div>

    <el-divider border-style="dashed" />

    <div>
      <span class="my-2 block">v-click-outside 指令：</span>
      <el-button v-click-outside="() => ElMessage.success('点击了外部')">
        点击外部触发
      </el-button>
    </div>
  </Card>
</template>

<style scoped></style>
