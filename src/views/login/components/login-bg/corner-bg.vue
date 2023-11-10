<script setup lang="ts">
import CornerTop from './corner-top.vue'
import CornerBottom from './corner-bottom.vue'
</script>

<template>
  <div class="absolute-lt z--1 wh-full overflow-hidden">
    <div class="absolute -right-650px -top-950px <sm:(-right-100px -top-1150px)">
      <CornerTop />
    </div>
    <div class="absolute -bottom-450px -left-250px <sm:(-bottom-750px -left-100px)">
      <CornerBottom />
    </div>
    <div class="fly bg-fly-circle1" />
    <div class="fly bg-fly-circle2" />
    <div class="fly bg-fly-circle3" />
    <div class="fly bg-fly-circle4" />
  </div>
</template>

<style scoped lang="less">
.fly {
  border-radius: 50%;
  pointer-events: none;
  position: fixed;
  z-index: 9999;
}

.bg-fly-circle1 {
  left: 40px;
  top: 100px;
  width: 100px;
  height: 100px;
  background: linear-gradient(
    to right,
    rgba(var(--hb-bg-fly-circle), 0.07) 0%,
    rgba(var(--hb-bg-fly-circle), 0.04) 100%
  );
  animation: move 2.5s linear infinite;
}

.bg-fly-circle2 {
  left: 5%;
  top: 45%;
  width: 150px;
  height: 150px;
  background: linear-gradient(
    to right,
    rgba(var(--hb-bg-fly-circle), 0.08) 0%,
    rgba(var(--hb-bg-fly-circle), 0.04) 100%
  );
  animation: move 3s linear infinite;
}

.bg-fly-circle3 {
  right: 22%;
  top: 15%;
  width: 145px;
  height: 145px;
  background: linear-gradient(
    to right,
    rgba(var(--hb-bg-fly-circle), 0.1) 0%,
    rgba(var(--hb-bg-fly-circle), 0.04) 100%
  );
  animation: move 2.5s linear infinite;
}

.bg-fly-circle4 {
  right: 2%;
  top: 30%;
  width: 160px;
  height: 160px;
  background: linear-gradient(
    to right,
    rgba(var(--hb-bg-fly-circle), 0.02) 0%,
    rgba(var(--hb-bg-fly-circle), 0.04) 100%
  );
  animation: move 3.5s linear infinite;
}

@keyframes move {
  0% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(25px) scale(1.1);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}
</style>
