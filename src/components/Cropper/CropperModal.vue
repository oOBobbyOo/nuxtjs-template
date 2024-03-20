<script setup lang="ts">
import type { UploadProps, UploadRawFile } from 'element-plus'
import type { CropendResult, UploadParams } from '@/typings/cropper'
import { useDialog } from '@/hooks/web/useDialog'
import { isFunction } from '@/utils/is'
import { dataURLtoBlob } from '@/utils/file'

defineOptions({ name: 'CropperModal' })

const props = withDefaults(defineProps<Props>(), {
  circled: true,
})

const emit = defineEmits(['uploadSuccess', 'uploadError', 'register'])

interface Props {
  src?: string
  circled?: boolean
  size?: number
  uploadApi: ({ file, filename }: UploadParams) => Promise<any>
}

const { visible, openDialog, closeDialog } = useDialog()

let filename = ''
const src = ref(props.src || '')
const previewSource = ref('')
const cropper = ref<Cropper>()
const loading = ref(false)
let scaleX = 1
let scaleY = 1

function handleCropend({ imgBase64 }: CropendResult) {
  previewSource.value = imgBase64
}

function handleReady(cropperInstance: Cropper) {
  cropper.value = cropperInstance
}

const handleBeforeUpload: UploadProps['beforeUpload'] = (file: UploadRawFile) => {
  if (props.size && file.size > 1024 * 1024 * props.size) {
    emit('uploadError', { msg: '图片太大' })
    return false
  }
  const reader = new FileReader()
  reader.readAsDataURL(file)
  src.value = ''
  previewSource.value = ''
  reader.onload = function (e) {
    src.value = (e.target?.result as string) ?? ''
    filename = file.name
  }
  return false
}

async function handleComfirm() {
  if (!previewSource.value) {
    ElNotification({
      title: '温馨提示',
      message: '请先上传图片！',
      type: 'warning',
    })
    return
  }

  const uploadApi = props.uploadApi
  if (uploadApi && isFunction(uploadApi)) {
    const blob = dataURLtoBlob(previewSource.value)
    try {
      loading.value = true
      const result = await uploadApi({ file: blob, filename })
      emit('uploadSuccess', { source: previewSource.value, url: result.url })
      closeDialog()
    }
    catch {
      emit('uploadError', { msg: '上传失败' })
    }
    finally {
      loading.value = false
    }
  }
}

function handlerToolbar(event: keyof Cropper, arg?: any) {
  if (event === 'scaleX')
    scaleX = arg = scaleX === -1 ? 1 : -1

  if (event === 'scaleY')
    scaleY = arg = scaleY === -1 ? 1 : -1

  // @ts-expect-error 忽略ts错误
  cropper?.value?.[event]?.(arg)
}

defineExpose({ openDialog, closeDialog })
</script>

<template>
  <Dialog v-model:visible="visible" width="800px" title="头像裁切" :fullscreen="false">
    <div class="cropper-dialog">
      <div class="cropper-dialog-left">
        <div class="cropper-dialog-image">
          <CropperImage
            v-if="src"
            :src="src"
            height="300px"
            :circled="circled"
            @cropend="handleCropend"
            @ready="handleReady"
          />
        </div>
        <div class="cropper-dialog-toolbar">
          <el-upload action="#" accept="image/*" :before-upload="handleBeforeUpload">
            <el-tooltip content="上传图片" placement="bottom">
              <el-button type="primary" size="small">
                <template #icon>
                  <Icon icon="uil:image-upload" size="18" />
                </template>
              </el-button>
            </el-tooltip>
          </el-upload>

          <el-space class="mb-1">
            <el-tooltip content="重置" placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('reset')"
              >
                <template #icon>
                  <Icon icon="ant-design:reload-outlined" size="18" />
                </template>
              </el-button>
            </el-tooltip>

            <el-tooltip content="逆时针旋转" placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', -45)"
              >
                <template #icon>
                  <Icon icon="ant-design:rotate-left-outlined" size="18" />
                </template>
              </el-button>
            </el-tooltip>

            <el-tooltip content="顺时针旋转" placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', 45)"
              >
                <template #icon>
                  <Icon icon="ant-design:rotate-right-outlined" size="18" />
                </template>
              </el-button>
            </el-tooltip>

            <el-tooltip content="水平翻转" placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleX')"
              >
                <template #icon>
                  <Icon icon="vaadin:arrows-long-h" size="18" />
                </template>
              </el-button>
            </el-tooltip>

            <el-tooltip content="垂直翻转" placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleY')"
              >
                <template #icon>
                  <Icon icon="vaadin:arrows-long-v" size="18" />
                </template>
              </el-button>
            </el-tooltip>

            <el-tooltip content="放大" placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', -0.1)"
              >
                <template #icon>
                  <Icon icon="ant-design:zoom-out-outlined" size="18" />
                </template>
              </el-button>
            </el-tooltip>

            <el-tooltip content="缩小" placement="bottom">
              <el-button
                type="primary"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', 0.1)"
              >
                <template #icon>
                  <Icon icon="ant-design:zoom-in-outlined" size="18" />
                </template>
              </el-button>
            </el-tooltip>
          </el-space>
        </div>
      </div>
      <div class="cropper-dialog-right">
        <div class="cropper-dialog-preview">
          <img v-if="previewSource" :src="previewSource">
        </div>
        <template v-if="previewSource">
          <div class="cropper-dialog-group">
            <el-avatar :src="previewSource" size="default" />
            <el-avatar :src="previewSource" :size="48" />
            <el-avatar :src="previewSource" :size="64" />
            <el-avatar :src="previewSource" :size="80" />
          </div>
        </template>
      </div>
    </div>

    <template #footer>
      <el-button @click="closeDialog">
        取消
      </el-button>
      <el-button type="primary" :loading="loading" @click="handleComfirm">
        确认并上传
      </el-button>
    </template>
  </Dialog>
</template>

<style scoped lang="less">
.cropper-dialog {
  display: flex;

  &-left,
  &-right {
    height: 340px;
  }

  &-left {
    width: 55%;
  }

  &-right {
    width: 45%;
  }

  &-image {
    height: 300px;
    background: #eee;
    background-image: linear-gradient(
        45deg,
        rgb(0 0 0 / 25%) 25%,
        transparent 0,
        transparent 75%,
        rgb(0 0 0 / 25%) 0
      ),
      linear-gradient(
        45deg,
        rgb(0 0 0 / 25%) 25%,
        transparent 0,
        transparent 75%,
        rgb(0 0 0 / 25%) 0
      );
    background-position:
      0 0,
      12px 12px;
    background-size: 24px 24px;
  }

  &-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }

  &-preview {
    width: 220px;
    height: 220px;
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid var(--el-border-color);
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-group {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
