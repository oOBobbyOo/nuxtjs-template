<script setup lang="ts">
import type { UploadProps, UploadRequestOptions } from 'element-plus'
import { nanoid } from 'nanoid'
import { uploadImg } from '@/api/upload'

interface UploadFileProps {
  imageUrl: string // 图片地址 ==> 必传
  api?: (params: any) => Promise<any> // 上传图片的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可 ==> 非必传
  drag?: boolean // 是否支持拖拽上传 ==> 非必传（默认为 true）
  disabled?: boolean // 是否禁用上传组件 ==> 非必传（默认为 false）
  fileSize?: number // 图片大小限制 ==> 非必传（默认为 5M）
  fileType?: string[] // 图片类型限制 ==> 非必传（默认为 ["image/jpeg", "image/png", "image/gif"]）
  height?: string // 组件高度 ==> 非必传（默认为 150px）
  width?: string // 组件宽度 ==> 非必传（默认为 150px）
  borderRadius?: string // 组件边框圆角 ==> 非必传（默认为 8px）
}

const props = withDefaults(defineProps<UploadFileProps>(), {
  imageUrl: '',
  drag: true,
  disabled: false,
  fileSize: 5,
  fileType: () => ['image/jpeg', 'image/png', 'image/gif'],
  height: '150px',
  width: '150px',
  borderRadius: '8px',
})

const emit = defineEmits<{
  'update:imageUrl': [value: string]
}>()

// 生成组件唯一id
const uuid = ref(`id-${nanoid()}`)

// 查看图片
const imgViewVisible = ref(false)

// 是否禁用
const isDisabled = computed(() => {
  return props.disabled
})

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 */
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const imgSize = rawFile.size / 1024 / 1024 < props.fileSize
  const imgType = props.fileType.includes(rawFile.type)
  if (!imgType) {
    ElNotification({
      title: '温馨提示',
      message: '上传图片不符合所需的格式！',
      type: 'warning',
    })
  }
  if (!imgSize) {
    setTimeout(() => {
      ElNotification({
        title: '温馨提示',
        message: `上传图片大小不能超过 ${props.fileSize}M！`,
        type: 'warning',
      })
    }, 0)
  }
  return imgType && imgSize
}

/**
 * @description 图片上传
 * @param options upload 所有配置项
 */
async function handleHttpUpload(options: UploadRequestOptions) {
  const formData = new FormData()
  formData.append('file', options.file)
  try {
    const api = props.api ?? uploadImg
    const { fileUrl } = await api(formData)
    emit('update:imageUrl', fileUrl)
  }
  catch (error) {
    options.onError(error as any)
  }
}

/**
 * @description 图片上传成功
 */
function uploadSuccess() {
  ElNotification({
    title: '温馨提示',
    message: '图片上传成功！',
    type: 'success',
  })
}

/**
 * @description 图片上传错误
 */
function uploadError() {
  ElNotification({
    title: '温馨提示',
    message: '图片上传失败，请您重新上传！',
    type: 'error',
  })
}

/**
 * @description 删除图片
 */
function deleteImg() {
  emit('update:imageUrl', '')
}

/**
 * @description 编辑图片
 */
function editImg() {
  const dom = document.querySelector(`#${uuid.value} .el-upload__input`)
  dom && dom.dispatchEvent(new MouseEvent('click'))
}
</script>

<template>
  <div class="upload-box">
    <el-upload
      :id="uuid"
      action="#"
      class="upload" :class="[isDisabled ? 'disabled' : '', drag ? 'no-border' : '']"
      :multiple="false"
      :disabled="isDisabled"
      :drag="drag"
      :show-file-list="false"
      :accept="fileType.join(',')"
      :before-upload="beforeUpload"
      :http-request="handleHttpUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
    >
      <template v-if="imageUrl">
        <img :src="imageUrl" class="upload-image">
        <div class="upload-handle" @click.stop>
          <div v-if="!isDisabled" class="handle-icon" @click="editImg">
            <Icon icon="material-symbols:edit-square-outline" />
            <span>编辑</span>
          </div>
          <div class="handle-icon" @click="imgViewVisible = true">
            <Icon icon="zondicons:zoom-in" />
            <span>查看</span>
          </div>
          <div v-if="!isDisabled" class="handle-icon" @click="deleteImg">
            <Icon icon="material-symbols:delete" />
            <span>删除</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="upload-empty flex-center flex-col space-y-2">
          <slot name="empty">
            <Icon v-if="!isDisabled" icon="material-symbols:add" />
            <Icon v-else icon="mdi:cancel" />
          </slot>
        </div>
      </template>
    </el-upload>
    <div class="upload-tip">
      <slot name="tip" />
    </div>
    <el-image-viewer v-if="imgViewVisible" :url-list="[imageUrl]" @close="imgViewVisible = false" />
  </div>
</template>

<style scoped lang="less">
.upload-box {
  width: v-bind(width);

  ::v-deep(.upload) {
    // &.disabled {
    //   .el-upload {
    //     cursor: not-allowed !important;
    //     background: var(--el-disabled-bg-color);
    //     border: 1px dashed var(--el-border-color-darker) !important;
    //     &:hover {
    //       border: 1px dashed var(--el-border-color-darker) !important;
    //     }
    //   }
    // }

    &.no-border {
      .el-upload {
        border: none !important;
      }
    }

    .el-upload {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: v-bind(width);
      height: v-bind(height);
      overflow: hidden;
      border: 1px dashed var(--el-border-color-darker);
      border-radius: v-bind(borderRadius);
      transition: var(--el-transition-duration-fast);
      &:hover {
        border-color: var(--el-color-primary);
        .upload-handle {
          opacity: 1;
        }
      }
    }

    .el-upload-dragger {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 0;
      overflow: hidden;
      background-color: transparent;
      border: 1px dashed var(--el-border-color-darker);
      border-radius: v-bind(borderRadius);
      &:hover {
        border: 1px dashed var(--el-color-primary-light-9);
      }
    }
    .el-upload-dragger.is-dragover {
      background-color: var(--el-color-primary-light-9);
      border: 2px dashed var(--el-color-primary) !important;
    }

    .upload-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .upload-handle {
      position: absolute;
      top: 0;
      right: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
      background: rgb(0 0 0 / 60%);
      opacity: 0;
      transition: var(--el-transition-duration-fast);

      .handle-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 6%;
        color: aliceblue;
        .app-iconify {
          margin-bottom: 40%;
          font-size: 130%;
          line-height: 130%;
        }
        span {
          font-size: 85%;
          line-height: 85%;
        }
      }
    }

    .upload-empty {
      font-size: 12px;
      line-height: 30px;
      color: var(--el-color-info);
      .app-iconify {
        font-size: 28px;
        color: var(--el-text-color-secondary);
      }
    }
  }

  .upload-tip {
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    padding: 8px 0;
  }
}
</style>
