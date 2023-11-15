<script setup lang="ts">
import { formatPadZero } from '@/utils/time'

interface TrackItemProps {
  id: number
  name: string
  artist: string
  cover: string
  source: string
  url: string
  favorited: boolean
}

const transitionName = ref('scale-in')

const audioState = reactive({
  loading: true,
  duration: 0,
  currentTime: 0,
  isPlaying: false,
})

const audioRef = ref<HTMLAudioElement>()
const progressRef = ref<HTMLElement>()

const currentTrackIndex = ref(0)
const currentTrack = ref<TrackItemProps | null>(null)

const musics: TrackItemProps[] = [
  {
    id: 0,
    name: 'Mekanın Sahibi',
    artist: 'Norm Ender',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3',
    url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
    favorited: false,
  },
  {
    id: 1,
    name: 'Everybody Knows',
    artist: 'Leonard Cohen',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3',
    url: 'https://www.youtube.com/watch?v=Lin-a2lTelg',
    favorited: true,
  },
  {
    id: 2,
    name: 'Extreme Ways',
    artist: 'Moby',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3',
    url: 'https://www.youtube.com/watch?v=ICjyAe9S54c',
    favorited: false,
  },
  {
    id: 3,
    name: 'Butterflies',
    artist: 'Sia',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3',
    url: 'https://www.youtube.com/watch?v=kYgGwWYOd9Y',
    favorited: false,
  },
  {
    id: 4,
    name: 'The Final Victory',
    artist: 'Haggard',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3',
    url: 'https://www.youtube.com/watch?v=0WlpALnQdN8',
    favorited: true,
  },
  {
    id: 5,
    name: 'Genius ft. Sia, Diplo, Labrinth',
    artist: 'LSD',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3',
    url: 'https://www.youtube.com/watch?v=HhoATZ1Imtw',
    favorited: false,
  },
  {
    id: 6,
    name: 'The Comeback Kid',
    artist: 'Lindi Ortega',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3',
    url: 'https://www.youtube.com/watch?v=me6aoX0wCV8',
    favorited: true,
  },
  {
    id: 7,
    name: 'Overdose',
    artist: 'Grandson',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3',
    url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
    favorited: false,
  },
  {
    id: 8,
    name: 'Rag\'n\'Bone Man',
    artist: 'Human',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3',
    url: 'https://www.youtube.com/watch?v=L3wKzyIN1yk',
    favorited: false,
  },
]
const tracks = reactive(musics)

const durationStr = computed(() => {
  return generateTime(audioState.duration)
})

const currentTimeStr = computed(() => {
  return generateTime(audioState.currentTime)
})

const progressWidth = computed(() => {
  if (audioState.currentTime === 0)
    return '0%'
  const width = (100 / audioState.duration) * audioState.currentTime
  return `${width}%`
})

// 当浏览器可以开始播放音频/视频时触发
function onCanPlay() {
  audioState.loading = false
}

// 当音频/视频的时长已更改时触发
function onDurationChange(event: any) {
  audioState.duration = event.target.duration | 0
}

// 当目前的播放位置已更改时触发
function onTimeUpdate(event: any) {
  audioState.currentTime = event.target.currentTime | 0
}

// 当浏览器已加载音频/视频的元数据时触发
function onLoadedMetaData(event: any) {
  audioState.currentTime = event.target.currentTime | 0
}

// 当用户已移动/跳跃到音频/视频中的新位置时触发
function onSeeked() {
  play()
}

// 当目前的播放已结束时触发
function onEnded() {
  nextTrack()
}

function generateTime(time: number) {
  if (time === 0)
    return '00:00'
  const curmin = Math.floor(time / 60)
  const cursec = Math.floor(time - curmin * 60)
  return `${formatPadZero(curmin)}:${formatPadZero(cursec)}`
}

// 点赞
function favorite() {
  tracks[currentTrackIndex.value].favorited = !tracks[currentTrackIndex.value].favorited
}

// 播放
function play() {
  if (!audioRef.value || audioState.loading)
    return
  if (audioRef.value.paused) {
    audioRef.value.play()
    audioState.isPlaying = true
  }
  else {
    audioRef.value.pause()
    audioState.isPlaying = false
  }
}

// 重置
function resetPlayer() {
  audioState.loading = true
  audioState.duration = 0
  audioState.currentTime = 0
  audioState.isPlaying = false

  if (!audioRef.value)
    return
  audioRef.value.currentTime = 0
  audioRef.value.src = currentTrack.value?.source || tracks[0].source
  audioState.isPlaying = true

  nextTick(() => {
    if (audioState.isPlaying)
      audioRef.value?.play()
    else audioRef.value?.pause()
  })
}

// 上一首
function prevTrack() {
  transitionName.value = 'scale-in'
  if (currentTrackIndex.value > 0)
    currentTrackIndex.value--
  else currentTrackIndex.value = tracks.length - 1

  currentTrack.value = tracks[currentTrackIndex.value]
  resetPlayer()
}

// 下一首
function nextTrack() {
  transitionName.value = 'scale-out'
  if (currentTrackIndex.value < tracks.length - 1)
    currentTrackIndex.value++
  else currentTrackIndex.value = 0

  currentTrack.value = tracks[currentTrackIndex.value]
  resetPlayer()
}

// 更新播放进度
function updatePregress(x: number) {
  if (!audioRef.value || !progressRef.value || audioState.loading)
    return

  audioRef.value.pause()
  audioState.isPlaying = false

  const progress = progressRef.value
  const position = x - progress.offsetLeft
  let percentage = (100 * position) / progress.offsetWidth

  if (percentage > 100)
    percentage = 100

  if (percentage < 0)
    percentage = 0

  const duration = audioState.duration
  const currentTime = (duration * percentage) / 100
  audioState.currentTime = currentTime
  audioRef.value.currentTime = currentTime
}

// 点击进度条触发更新播放进度
function handleProgress(e: any) {
  updatePregress(e.pageX)
}

// 初始化
function initPlayerTrack() {
  if (!audioRef.value)
    return
  currentTrack.value = tracks[0]
  audioRef.value.src = currentTrack.value.source
}

onMounted(() => {
  initPlayerTrack()
})
</script>

<template>
  <div class="wh-full flex-center">
    <div class="player">
      <div class="player-top">
        <div class="player-top-cover">
          <transition-group :name="transitionName">
            <template v-for="(track, index) in tracks">
              <div
                v-if="currentTrackIndex === index"
                :key="index"
                class="player-cover-item"
                :style="{ backgroundImage: `url(${track.cover})` }"
              >
                <!-- <img :src="track.cover" alt="" /> -->
              </div>
            </template>
          </transition-group>
        </div>
        <div class="player-controls">
          <div
            class="player-controls-item mb-4 cursor-pointer p-1"
            :class="{ active: currentTrack?.favorited }"
            @click="favorite"
          >
            <Icon class="icon" size="36" icon="material-symbols:favorite" />
          </div>
          <div class="player-controls-item mb-4 cursor-pointer p-1">
            <Icon class="icon" size="36" icon="material-symbols:bluetooth-connected" />
          </div>
          <div class="player-controls-item mb-4 cursor-pointer p-1" @click="prevTrack">
            <Icon class="icon" size="36" icon="mdi:skip-previous-circle" />
          </div>
          <div class="player-controls-item mb-4 cursor-pointer p-1" @click="nextTrack">
            <Icon class="icon" size="36" icon="mdi:skip-next-circle" />
          </div>
          <div class="player-controls-item is-play cursor-pointer" @click="play">
            <Icon
              v-if="audioState.loading"
              class="p-2"
              size="80"
              icon="pepicons-pop:music-note-single-circle-off"
            />
            <Icon
              v-else-if="!audioState.isPlaying"
              size="96"
              icon="material-symbols:play-circle-outline"
            />
            <Icon v-else size="96" icon="material-symbols:pause-circle-outline" />
          </div>
        </div>
      </div>

      <div class="player-progress">
        <div class="player-progress-top">
          <div v-if="currentTrack" class="album-info">
            <div class="album-info-name">
              {{ currentTrack.artist }}
            </div>
            <div class="album-info-track">
              {{ currentTrack.name }}
            </div>
          </div>
          <div class="progress-duration">
            {{ durationStr }}
          </div>
        </div>
        <div ref="progressRef" class="player-progress-bar" @click="handleProgress">
          <div class="progress-current" :style="{ width: progressWidth }" />
        </div>
        <div class="player-progress-time">
          {{ currentTimeStr }}
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      class="hidden"
      preload="auto"
      @canplay="onCanPlay"
      @durationchange="onDurationChange"
      @loadedmetadata="onLoadedMetaData"
      @timeupdate="onTimeUpdate"
      @seeked="onSeeked"
      @ended="onEnded"
    />
  </div>
</template>

<style scoped lang="less">
.player {
  width: 410px;
  min-height: 480px;
  padding: 30px;
  background: #eef3f7;
  box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
  border-radius: 15px;
  &-top {
    display: flex;
    align-items: flex-start;
    position: relative;
    &-cover {
      width: 300px;
      height: 300px;
      margin-left: -70px;
      flex-shrink: 0;
      position: relative;
      z-index: 2;
      border-radius: 15px;
      background-color: #ccc;
      .player-cover-item {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        position: absolute;
        left: 0;
        top: 0;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 15px;
          box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
          user-select: none;
          pointer-events: none;
          position: absolute;
          left: 0;
          top: 0;
        }

        &::before {
          content: '';
          background: inherit;
          width: 100%;
          height: 100%;
          box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
          display: block;
          z-index: 1;
          position: absolute;
          top: 30px;
          transform: scale(0.9);
          filter: blur(10px);
          opacity: 0.9;
          border-radius: 15px;
        }
        &::after {
          content: '';
          background: inherit;
          width: 100%;
          height: 100%;
          box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
          display: block;
          z-index: 2;
          position: absolute;
          border-radius: 15px;
        }
      }
    }
  }
  &-controls {
    flex: 1;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-item {
      color: #acb8cc;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      transition: all 0.3s ease-in-out;

      &::before {
        content: '';
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #fff;
        transform: scale(0.5);
        opacity: 0;
        box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
        transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
      }

      &:hover {
        color: #532ab9;
        &::before {
          opacity: 1;
          transform: scale(1.3);
        }
      }

      &.active {
        color: #f00;
      }

      &.is-play {
        color: #fff;
        filter: drop-shadow(0 11px 6px rgba(172, 184, 204, 0.45));

        &::before {
          display: none;
        }
      }

      .icon {
        position: relative;
        z-index: 2;
      }
    }
  }
  &-progress {
    width: 100%;
    margin-top: -15px;
    user-select: none;
    &-top {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .album-info {
        color: #71829e;
        flex: 1;
        padding-right: 60px;
        user-select: none;
        &-name {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 12px;
          line-height: 1.3em;
        }
        &_track {
          font-weight: 400;
          font-size: 20px;
          opacity: 0.7;
          line-height: 1.3em;
          min-height: 52px;
        }
      }
      .player-duration {
        color: #71829e;
        font-weight: 700;
        font-size: 20px;
        opacity: 0.5;
      }
    }
    &-bar {
      display: inline-block;
      width: 100%;
      height: 6px;
      cursor: pointer;
      background-color: #d0d8e6;
      border-radius: 10px;
      .progress-current {
        width: 0%;
        height: inherit;
        background-color: #a3b3ce;
        border-radius: 10px;
      }
    }
    &-time {
      margin-top: 2px;
      color: #71829e;
      font-weight: 700;
      font-size: 16px;
      opacity: 0.7;
    }
  }
}
</style>
