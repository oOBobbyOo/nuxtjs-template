<script setup lang="ts">
import type { CropendResult } from '@/typings/cropper'
import img from '@/assets/yuanshen.jpg'
import { uploadAvatar } from '@/api/upload'

const cropperImg = ref('')
const cropperInfo = ref()

const circleImg = ref('')
const circleInfo = ref()

function handleCropend({ imgBase64, imgInfo }: CropendResult) {
  cropperInfo.value = imgInfo
  cropperImg.value = imgBase64
}

function handleCircleCropend({ imgBase64, imgInfo }: CropendResult) {
  circleInfo.value = imgInfo
  circleImg.value = imgBase64
}
</script>

<template>
  <div>
    <Card title="图像裁剪" class="mb-4">
      <div class="flex flex-wrap items-center">
        <CropperAvatar :upload-api="uploadAvatar" />
      </div>
    </Card>

    <Card title="矩形裁剪" class="mb-4">
      <div class="flex flex-wrap items-center">
        <div class="mb-4 mr-10 w-[40vw]">
          <CropperImage :src="img" style="width: 40vw" @cropend="handleCropend" />
        </div>
        <div v-if="cropperImg">
          <div className="img-preview bg-gray-1 dark:bg-gray-6 preview-lg">
            <img :src="cropperImg">
          </div>
          <div className="img-preview  bg-gray-1 dark:bg-gray-6 preview-md">
            <img :src="cropperImg">
          </div>
          <div className="img-preview  bg-gray-1 dark:bg-gray-6 preview-sm">
            <img :src="cropperImg">
          </div>
          <div className="img-preview  bg-gray-1 dark:bg-gray-6 preview-xs">
            <img :src="cropperImg">
          </div>
        </div>
      </div>
      <p v-if="cropperImg" class="pt-4">
        裁剪后图片信息：{{ cropperInfo }}
      </p>
    </Card>

    <Card title="圆形裁剪" class="mb-4">
      <div class="flex flex-wrap items-center">
        <div class="mb-4 mr-10 w-[40vw]">
          <CropperImage :src="img" circled style="width: 40vw" @cropend="handleCircleCropend" />
        </div>
        <img v-if="circleImg" :src="circleImg" class="preview-circled">
      </div>
      <p v-if="circleImg" class="pt-4">
        裁剪后图片信息：{{ circleInfo }}
      </p>
    </Card>
  </div>
</template>

<style scoped lang="less">
.img-preview {
  float: left;
  margin-right: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;

  img {
    max-width: 100%;
  }
}

.preview-lg {
  width: 16rem;
}

.preview-md {
  width: 8rem;
}

.preview-sm {
  width: 4rem;
}

.preview-xs {
  width: 2rem;
  margin-right: 0;
}

.preview-circled {
  height: 360px;
}
</style>
