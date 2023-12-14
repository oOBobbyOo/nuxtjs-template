<script setup lang="ts">
import { ElInput } from 'element-plus'
import { nanoid } from 'nanoid'
import { useUserStore } from '@/stores/modules/user'

const { getUserInfo } = useUserStore()

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

function showInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

function handleInputConfirm() {
  if (inputValue.value) {
    const userInfo = unref(getUserInfo)
    const newTag = {
      key: nanoid(),
      label: inputValue.value,
    }
    console.log('>>: userInfo', userInfo)
    console.log('>>: newTag', newTag)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<template>
  <PageWrap>
    <div v-if="getUserInfo" class="account-center">
      <div class="flex flex-col">
        <div class="account-center-avatar">
          <img :src="getUserInfo.avatar">
        </div>
        <div class="account-center-name">
          {{ getUserInfo.realName }}
        </div>
        <div class="account-center-profile">
          {{ getUserInfo.profile || '海纳百川，有容乃大' }}
        </div>
      </div>

      <div class="account-center-info mt-6">
        <p>
          <Icon icon="ant-design:user-outlined" class="mr-2" />
          <span>{{ getUserInfo.username }}</span>
        </p>
        <p>
          <Icon icon="ant-design:solution-outlined" class="mr-2" />
          <span>集团 - 事业群 - 技术部</span>
        </p>
        <p>
          <Icon icon="ant-design:code-outlined" class="mr-2" />
          <span>JavaScript、HTML、CSS、Vue、React</span>
        </p>
        <p>
          <Icon icon="ant-design:environment-outlined" class="mr-2" />
          <span>{{ getUserInfo.address }}</span>
        </p>
      </div>

      <el-divider border-style="dashed" />

      <div v-if="getUserInfo.tags" class="account-center-tags">
        <div class="mb-3 font-medium">
          个性标签
        </div>
        <div class="flex flex-row items-center">
          <el-tag
            v-for="tag in getUserInfo.tags"
            :key="tag.key"
            :disable-transitions="false"
            effect="plain"
            class="mx-1"
          >
            {{ tag.label }}
          </el-tag>

          <ElInput
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="ml-1 !w-[80px]"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="ml-1" size="small" @click="showInput">
            +
          </el-button>
        </div>
      </div>
    </div>
  </PageWrap>
</template>

<style scoped lang="less">
.account-center {
  &-avatar {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    border-radius: 50%;

    &:hover {
      transition: all 59s cubic-bezier(0.34, 0, 0.84, 1) 0.5s;
      transform: rotate(666turn);
    }
  }

  &-name {
    @apply mb-1 font-medium text-xl;
  }

  &-info {
    p {
      @apply flex items-center py-2 text-sm;
    }
  }
}
</style>
