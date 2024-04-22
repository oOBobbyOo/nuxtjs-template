<script setup lang="ts">
import { BorderBox13 as DvBorderBox13 } from '@kjgl77/datav-vue3'

import ConversionRateChart from './components/ConversionRateChart/index.vue'
import LoginTrendsChart from './components/LoginTrendsChart/index.vue'
import NewlyUsersChart from './components/NewlyUsersChart/index.vue'
import PaymentRateChart from './components/PaymentRateChart/index.vue'
import PaymentRankChart from './components/PaymentRankChart/index.vue'
import NewlyPaymentChart from './components/NewlyPaymentChart/index.vue'

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
            <DvBorderBox13>
              <div class="title">
                转化率
              </div>
              <ConversionRateChart />
            </DvBorderBox13>
          </div>
          <div class="middle">
            <DvBorderBox13>
              <div class="title">
                登录趋势
              </div>
              <LoginTrendsChart />
            </DvBorderBox13>
          </div>
          <div class="bottom">
            <DvBorderBox13>
              <div class="title">
                新增用户
              </div>
              <NewlyUsersChart />
            </DvBorderBox13>
          </div>
        </div>
        <div class="main-mc" />
        <div class="main-rc">
          <div class="top">
            <DvBorderBox13>
              <div class="title">
                付费率
              </div>
              <PaymentRateChart />
            </DvBorderBox13>
          </div>
          <div class="middle">
            <DvBorderBox13>
              <div class="title">
                付费排名
              </div>
              <PaymentRankChart />
            </DvBorderBox13>
          </div>
          <div class="bottom">
            <DvBorderBox13>
              <div class="title">
                新增付费
              </div>
              <NewlyPaymentChart />
            </DvBorderBox13>
          </div>
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
        font-family: 'lobster';
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
    padding: 10px 20px;

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

      .title {
        font-size: 18px;
        font-weight: 900;
        letter-spacing: 2px;
        background: linear-gradient(92deg, #0072ff, #00eaff 48%, #01aaff);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        position: absolute;
        top: 6%;
        left: 3%;
      }

      .top {
        width: 100%;
        height: 320px;
      }
      .middle {
        width: 100%;
        height: 330px;
      }
      .bottom {
        width: 100%;
        height: 320px;
      }
    }
  }
}
</style>
