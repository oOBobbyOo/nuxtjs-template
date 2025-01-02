<script setup lang="ts">
import { Vue3Esign } from 'vue3-esign'

const esignRef: Ref<InstanceType<typeof Vue3Esign> | null> = ref(null)

const isCrop = ref(false)
const lineWidth = ref(6)
const lineColor = ref('#000000')
const bgColor = ref('rgba(0,0,0,0.1)')

const img = ref('')

async function handleRest() {
  esignRef.value?.reset()
}

async function handleCreate() {
  try {
    img.value = await (esignRef.value?.generate() as Promise<string>)
  }
  catch (error) {
    img.value = ''
  }
}
</script>

<template>
  <Card title="电子签名" class="h-full">
    <el-form label-position="left" label-width="auto">
      <Grid :gap="[20, 0]">
        <GridItem>
          <el-form-item label="画笔宽度：">
            <el-input-number v-model="lineWidth" :min="1" :max="20" />
          </el-form-item>
        </GridItem>
        <GridItem>
          <el-form-item label="画笔颜色：">
            <el-color-picker v-model="lineColor" show-alpha />
          </el-form-item>
        </GridItem>
        <GridItem>
          <el-button type="primary" plain @click="handleRest">
            重置画布
          </el-button>
          <el-button type="success" plain @click="handleCreate">
            生成图片
          </el-button>
        </GridItem>
      </Grid>
    </el-form>

    <div class="esign mt-5">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb-4">
          <Vue3Esign
            ref="esignRef" v-model:bgColor="bgColor" class="wh-full b-1 b-gray-200" :is-crop="isCrop"
            :line-width="lineWidth" :line-color="lineColor"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb-4">
          <el-image :src="img" class="wh-full b-1 b-gray-200">
            <template #error>
              <div class="image-slot wh-full flex-center p-10">
                <Icon icon="lets-icons:img-box" size="24" color="rgba(0,0,0,0.1)" />
              </div>
            </template>
          </el-image>
        </el-col>
      </el-row>
    </div>
  </Card>
</template>
