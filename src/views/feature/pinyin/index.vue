<script setup lang="ts">
import { html } from 'pinyin-pro'

// 诗词名称
const poetryTitle = ref('将进酒')

// 诗词作者
const poetryAuthor = ref('唐·李白')

// 诗词内容
const poetryContent = ref(
  `
  君不见，黄河之水天上来，奔流到海不复回。 <br />
  君不见，高堂明镜悲白发，朝如青丝暮成雪！<br />
  人生得意须尽欢，莫使金樽空对月。 <br />
  天生我材必有用，千金散尽还复来。<br />
  烹羊宰牛且为乐，会须一饮三百杯。<br />
  岑夫子，丹丘生，将进酒，杯莫停。<br />
  与君歌一曲，请君为我倾耳听。<br />
  钟鼓馔玉不足贵，但愿长醉不复醒。<br />
  古来圣贤皆寂寞，惟有饮者留其名。<br />
  陈王昔时宴平乐，斗酒十千恣欢谑。<br />
  主人何为言少钱，径须沽取对君酌。<br />
  五花马、千金裘，呼儿将出换美酒，与尔同销万古愁！
  `,
)

const poetryTitleStr = ref(html(poetryTitle.value))
const poetryAuthorStr = ref(html(poetryAuthor.value))
const poetryContentStr = ref(html(poetryContent.value))
</script>

<template>
  <Card title="诗词拼音" class="h-full">
    <div class="poetry-title" v-html="poetryTitleStr" />
    <div class="poetry-author" v-html="poetryAuthorStr" />
    <div class="poetry-content" v-html="poetryContentStr" />
  </Card>
</template>

<style scoped lang="less">
.poetry-title,
.poetry-author,
.poetry-content {
  ::v-deep(.py-result-item) {
    display: inline-block;
    padding: 10px 5px;
  }

  ::v-deep(.py-pinyin-item) {
    font-size: 12px;
    color: #ccc;
  }
}

.poetry-title {
  padding: 0 175px;

  ::v-deep(.py-chinese-item) {
    font-size: 28px;
    font-weight: bold;
  }

  ::v-deep(.py-pinyin-item) {
    font-size: 14px;
    font-weight: bold;
  }
}

.poetry-author {
  padding: 0 190px;

  ::v-deep(.py-chinese-item) {
    font-size: 14px;
    color: #999;
  }
}
</style>
