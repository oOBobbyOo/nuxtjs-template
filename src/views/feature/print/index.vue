<script setup lang="ts">
import printJS from 'print-js'
import testPdf from '@/assets/test.pdf'

const imgUrls = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]

function printJSON() {
  printJS({
    printable: [
      { name: 'zhangsan', age: '22', phone: '134***5678' },
      { name: 'lisi', age: '18', phone: '138***1234' },
      { name: 'wangwu', age: '30', phone: '137***4567' },
    ],
    properties: ['name', 'age', 'phone'],
    type: 'json',
  })
}

function printPDF() {
  printJS({
    // printable: 'docs/xx_large_printjs.pdf',
    printable: testPdf,
    type: 'pdf',
  })
}

function printHTML() {
  printJS({
    printable: 'printBox',
    type: 'html',
    header: 'Print HTML',
    targetStyles: ['*'], // 打印内容使用所有HTML样式
  })
}

function printIMG() {
  printJS({
    printable: 'http://placekitten.com/350/200',
    type: 'image',
  })
}

function printIMGS() {
  printJS({
    printable: [...imgUrls],
    type: 'image',
    header: 'Multiple Images',
  })
}
</script>

<template>
  <Card title="打印">
    <div space-4>
      <el-button type="primary" @click="printJSON">
        打印 JSON
      </el-button>
      <el-button type="primary" @click="printPDF">
        打印 PDF
      </el-button>
      <el-button type="primary" @click="printHTML">
        打印 HTML
      </el-button>
      <el-button type="primary" @click="printIMG">
        打印 图片
      </el-button>
      <el-button type="primary" @click="printIMGS">
        打印 多张图片
      </el-button>
    </div>

    <div id="printBox" pt-4>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="github">
          <el-link type="primary" href="https://github.com/crabbly/Print.js" target="_blank">
            https://github.com/crabbly/Print.js
          </el-link>
        </el-descriptions-item>
        <el-descriptions-item label="docs">
          <el-link type="primary" href="https://printjs.crabbly.com/" target="_blank">
            https://printjs.crabbly.com/
          </el-link>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </Card>
</template>

<style scoped></style>
