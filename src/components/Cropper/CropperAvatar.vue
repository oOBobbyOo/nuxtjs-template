<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { UploadParams } from '@/typings/cropper'

defineOptions({ name: 'CropperAvatar' })

const props = withDefaults(defineProps<Props>(), {
  width: '200px',
  showBtn: true,
  size: 5,
})

const emit = defineEmits(['update:value', 'change'])

interface Props {
  width?: number | string
  value?: string
  size?: number // 限制图片大小
  showBtn?: boolean
  btnText?: string
  uploadApi: ({ file, filename }: UploadParams) => Promise<any>
}

const sourceValue = ref(props.value || '')

const attrs = useAttrs()

const getClass = computed(() => {
  return ['cropper-avatar', attrs.class]
})

const getWidth = computed(() => `${`${props.width}`.replace(/px/, '')}px`)

const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }))

const getImageWrapperStyle = computed(
  (): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) }),
)

const getIconWidth = computed(() => `${Number.parseInt(`${props.width}`.replace(/px/, '')) / 2}px`)

const cropperModalRef = ref()
function openDialog() {
  cropperModalRef.value?.openDialog()
}

watchEffect(() => {
  sourceValue.value = props.value || ''
})

watch(
  () => sourceValue.value,
  (v: string) => {
    emit('update:value', v)
  },
)

function handleUploadSuccess({ source, url }: any) {
  sourceValue.value = source
  emit('change', { source, url })
  ElNotification({
    title: '温馨提示',
    message: '图片上传成功！',
    type: 'success',
  })
}
</script>

<template>
  <div :class="getClass" :style="getStyle">
    <div class="cropper-avatar-wrapper" :style="getImageWrapperStyle" @click="openDialog">
      <div v-if="!sourceValue" class="cropper-avatar-mask" />
      <Icon
        v-if="!sourceValue"
        icon="ant-design:cloud-upload-outlined"
        :size="getIconWidth"
        :style="getImageWrapperStyle"
        color="#d6d6d6"
      />
      <img v-if="sourceValue" class="cropper-avatar-img" :src="sourceValue" alt="avatar">
    </div>
    <el-button v-if="showBtn" type="primary" class="my-4" @click="openDialog">
      {{ btnText ?? '选择图片' }}
    </el-button>
  </div>
  <CropperModal
    ref="cropperModalRef"
    :upload-api="uploadApi"
    :src="sourceValue"
    :size="size"
    @upload-success="handleUploadSuccess"
  />
</template>

<style scoped lang="less">
.cropper-avatar {
  display: inline-block;
  text-align: center;

  &-wrapper {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--el-border-color);
    border-radius: 50%;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      object-fit: cover;
    }
    ::v-deep(svg) {
      margin: auto;
    }
  }

  &-mask {
    position: absolute;
    width: inherit;
    height: inherit;
    transition: opacity 0.4s;
    border: inherit;
    border-radius: inherit;
    opacity: 0;
    background: rgb(0 0 0 / 40%);
    cursor: pointer;

    &:hover {
      opacity: 40;
    }
  }
}
</style>
