<script setup lang="ts">
import ConversionRateChart from './components/ConversionRateChart/index.vue'
import LoginTrendsChart from './components/LoginTrendsChart/index.vue'
import NewlyTrendsChart from './components/NewlyTrendsChart/index.vue'
import PaymentRateChart from './components/PaymentRateChart/index.vue'

import { useCurrentTime } from '@/hooks/web/useCurrentTime'
import { useFixScreenSize } from '@/hooks/web/useFixScreenSize'

const [dataScreenRef] = useFixScreenSize()
const { time, weekDay } = useCurrentTime()
</script>

<template>
  <div class="big-screen">
    <div ref="dataScreenRef" class="big-screen-data">
      <!-- header -->
      <div class="big-screen-header">
        <div class="header-lc">
          <div class="top" />
        </div>
        <div class="header-mc">
          <div class="title">
            智慧可视化大数据展示平台
          </div>
          <div class="light" />
        </div>
        <div class="header-rc">
          <div class="top" />
          <div class="time">
            {{ time }} {{ weekDay }}
          </div>
        </div>
      </div>
      <!-- main -->
      <div class="big-screen-main">
        <div class="main-lc">
          <div class="top">
            <ConversionRateChart />
          </div>
          <div class="middle">
            <LoginTrendsChart />
          </div>
          <div class="bottom">
            <NewlyTrendsChart />
          </div>
        </div>
        <div class="main-mc" />
        <div class="main-rc">
          <div class="top">
            <PaymentRateChart />
          </div>
          <div class="middle" />
          <div class="bottom" />
        </div>
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
    transform: translate(-50%, -50%);
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

    .header-mc {
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

    .header-lc,
    .header-rc {
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
    .header-rc {
      .top {
        background: url('@/assets/big-screen/header-r.png') no-repeat center;
        background-size: cover;
      }
      .time {
        position: absolute;
        top: 20px;
        right: 20px;
        font-family: 'Lobster';
        font-size: 28px;
        font-weight: 400;
        color: #05e8fe;
        white-space: nowrap;
      }
    }
  }

  &-main {
    flex: 1;
    display: flex;

    .main-mc {
      flex: 1;
    }

    .main-lc,
    .main-rc {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: relative;
      width: 540px;

      .top {
        height: 32%;
      }
      .middle {
        height: 36%;
      }
      .bottom {
        height: 32%;
      }
    }
  }
}
</style>
