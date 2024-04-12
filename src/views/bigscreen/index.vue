<script setup lang="ts">
import { useFixScreenSize } from '@/hooks/web/useFixScreenSize'

const [dataScreenRef] = useFixScreenSize()
</script>

<template>
  <div class="big-screen">
    <div ref="dataScreenRef" class="big-screen-data">
      <!-- header -->
      <div class="big-screen-header">
        <div class="header-lt">
          <div class="top" />
        </div>
        <div class="header-ct">
          <div class="title">
            智慧可视化大数据展示平台
          </div>
          <div class="light" />
        </div>
        <div class="header-rt">
          <div class="top" />
        </div>
      </div>
      <!-- main -->
      <div class="big-screen-main">
        <div class="main-lt" />
        <div class="main-ct" />
        <div class="main-rt" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.big-screen {
  width: 100%;
  height: 100%;
  background: url('@/assets/big-screen/bg.png') no-repeat center;
  background-size: cover;

  &-data {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    transition: all 0.3s;
  }

  &-header {
    width: 100%;
    height: 61px;
    background: url('@/assets/big-screen/bg-header.png') no-repeat center;
    background-size: cover;
    display: flex;
    flex-direction: row;
    position: relative;

    .header-ct {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .title {
        font-size: 38px;
        font-weight: bold;
        background: linear-gradient(92deg, #0072ff 0%, #00eaff 68%, #01aaff 100%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .light {
        width: 100%;
        height: 56px;
        background: url('@/assets/big-screen/header-light.png') no-repeat center;
        background-size: cover;
        position: absolute;
        bottom: -26px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .header-lt,
    .header-rt {
      width: 540px;
      position: relative;
      .top {
        width: 140px;
        height: 6px;
        background: url('@/assets/big-screen/header-l.png') no-repeat center;
        background-size: cover;
        position: absolute;
        top: -3px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .header-rt {
      .top {
        background: url('@/assets/big-screen/header-r.png') no-repeat center;
        background-size: cover;
      }
    }
  }

  &-main {
    flex: 1;
    display: flex;

    .main-ct {
      flex: 1;
    }

    .main-lt,
    .main-rt {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: relative;
      width: 540px;
    }
  }
}
</style>
